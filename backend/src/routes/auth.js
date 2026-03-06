import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { query } from '../db/index.js'
import { authRequired } from '../middleware/auth.js'

const router = Router()

// ── POST /api/auth/login ─────────────────────────────────────────
router.post('/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  async (req, res) => {
    const errs = validationResult(req)
    if (!errs.isEmpty()) return res.status(422).json({ errors: errs.array() })

    const { email, password } = req.body
    try {
      const result = await query('SELECT * FROM patients WHERE email = $1', [email])
      if (!result.rowCount) return res.status(401).json({ message: 'Invalid credentials' })

      const patient = result.rows[0]
      if (!patient.password) return res.status(401).json({ message: 'Account not yet activated. Visit reception.' })

      const valid = await bcrypt.compare(password, patient.password)
      if (!valid) return res.status(401).json({ message: 'Invalid credentials' })

      const token = jwt.sign(
        { id: patient.id, name: patient.name, email: patient.email, role: 'patient' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      )

      res.json({
        token,
        patient: { id: patient.id, name: patient.name, email: patient.email, phone: patient.phone },
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Authentication failed' })
    }
  }
)

// ── GET /api/auth/me  — get current patient from token ──────────
router.get('/me', authRequired, async (req, res) => {
  try {
    const result = await query(
      'SELECT id, name, email, phone, dob, insurance FROM patients WHERE id = $1',
      [req.patient.id]
    )
    if (!result.rowCount) return res.status(404).json({ message: 'Patient not found' })
    res.json({ patient: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch profile' })
  }
})

// ── GET /api/patient/appointments ────────────────────────────────
router.get('/patient/appointments', authRequired, async (req, res) => {
  try {
    const result = await query(
      `SELECT * FROM appointments
       WHERE patient_phone = (SELECT phone FROM patients WHERE id = $1)
       ORDER BY appt_date DESC, appt_time DESC`,
      [req.patient.id]
    )
    res.json({ appointments: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch appointments' })
  }
})

export default router
