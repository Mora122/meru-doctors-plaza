import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { query } from '../db/index.js'
import { sendContactNotification } from '../services/mailer.js'

const router = Router()

router.post('/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
    body('email').optional({ checkFalsy: true }).isEmail().withMessage('Invalid email'),
  ],
  async (req, res) => {
    const errs = validationResult(req)
    if (!errs.isEmpty()) return res.status(422).json({ errors: errs.array() })

    const { name, email, phone, subject, message } = req.body
    try {
      await query(
        `INSERT INTO contact_inquiries (name, email, phone, subject, message)
         VALUES ($1,$2,$3,$4,$5)`,
        [name, email||null, phone||null, subject||null, message]
      )
      // Notify hospital team (non-blocking)
      sendContactNotification({ name, email, phone, subject, message }).catch(console.error)
      res.status(201).json({ message: 'Inquiry received. We will respond within 24 hours.' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Failed to send inquiry. Please try again.' })
    }
  }
)

export default router
