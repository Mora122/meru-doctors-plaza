import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { query } from '../db/index.js'
import { adminRequired } from '../middleware/auth.js'
import { sendAppointmentConfirmation } from '../services/mailer.js'

const router = Router()

// ── Generate booking reference ──────────────────────────────────
function genRef() {
  return `MDP-${Date.now().toString(36).toUpperCase()}`
}

// ── POST /api/appointments  — book a new appointment ───────────
router.post('/',
  [
    body('dept').notEmpty().withMessage('Department is required'),
    body('date').isISO8601().withMessage('Valid date is required')
                .custom(v => new Date(v) >= new Date(new Date().toDateString()) || 'Date must be today or future'),
    body('time').notEmpty().withMessage('Time slot is required'),
    body('name').trim().notEmpty().withMessage('Patient name is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('email').optional({ checkFalsy: true }).isEmail().withMessage('Invalid email'),
  ],
  async (req, res) => {
    const errs = validationResult(req)
    if (!errs.isEmpty()) {
      return res.status(422).json({ errors: errs.array() })
    }

    const { dept, date, time, name, phone, email, dob, reason, insurance } = req.body
    const reference = genRef()

    try {
      const result = await query(
        `INSERT INTO appointments
           (reference, patient_name, patient_phone, patient_email, patient_dob,
            insurance, department, appt_date, appt_time, reason, status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'pending')
         RETURNING *`,
        [reference, name, phone, email||null, dob||null, insurance||null, dept, date, time, reason||null]
      )

      const appt = result.rows[0]

      // Send confirmation email (non-blocking)
      if (email) {
        sendAppointmentConfirmation({ ...appt, name, email }).catch(err =>
          console.error('Email send error:', err)
        )
      }

      res.status(201).json({
        message:   'Appointment booked successfully',
        reference: appt.reference,
        appointment: appt,
      })
    } catch (err) {
      console.error('Appointment insert error:', err)
      res.status(500).json({ message: 'Failed to book appointment. Please try again.' })
    }
  }
)

// ── GET /api/appointments  — list all (admin only) ─────────────
router.get('/', adminRequired, async (req, res) => {
  const { date, status, dept } = req.query
  let sql = 'SELECT * FROM appointments WHERE 1=1'
  const params = []
  if (date)   { params.push(date);   sql += ` AND appt_date = $${params.length}` }
  if (status) { params.push(status); sql += ` AND status = $${params.length}`    }
  if (dept)   { params.push(dept);   sql += ` AND department ILIKE $${params.length}` }
  sql += ' ORDER BY appt_date, appt_time'

  try {
    const result = await query(sql, params)
    res.json({ appointments: result.rows, total: result.rowCount })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch appointments' })
  }
})

// ── PATCH /api/appointments/:id/status  — update status (admin) ─
router.patch('/:id/status', adminRequired,
  [body('status').isIn(['pending','confirmed','completed','cancelled'])],
  async (req, res) => {
    const errs = validationResult(req)
    if (!errs.isEmpty()) return res.status(422).json({ errors: errs.array() })

    try {
      const result = await query(
        'UPDATE appointments SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *',
        [req.body.status, req.params.id]
      )
      if (!result.rowCount) return res.status(404).json({ message: 'Appointment not found' })
      res.json({ appointment: result.rows[0] })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Update failed' })
    }
  }
)

export default router
