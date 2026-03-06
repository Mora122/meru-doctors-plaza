import { Router } from 'express'
import { query } from '../db/index.js'

const router = Router()

// ── GET /api/doctors ──────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT d.*, dep.name AS dept, dep.slug AS dept_slug
      FROM doctors d
      LEFT JOIN departments dep ON d.department_id = dep.id
      ORDER BY d.name
    `)
    res.json({ doctors: result.rows })
  } catch (err) {
    console.error(err)
    // Return static fallback so frontend always gets data
    res.json({ doctors: [], fallback: true })
  }
})

// ── GET /api/doctors/:id ──────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const result = await query(
      `SELECT d.*, dep.name AS dept FROM doctors d
       LEFT JOIN departments dep ON d.department_id = dep.id
       WHERE d.id = $1`,
      [req.params.id]
    )
    if (!result.rowCount) return res.status(404).json({ message: 'Doctor not found' })
    res.json({ doctor: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch doctor' })
  }
})

export default router
