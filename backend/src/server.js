import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

import appointmentsRouter from './routes/appointments.js'
import contactRouter      from './routes/contact.js'
import doctorsRouter      from './routes/doctors.js'
import authRouter         from './routes/auth.js'

const app  = express()
const PORT = process.env.PORT || 5000

// ── Security headers ─────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}))

// ── CORS ─────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:4173',
]
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true)
    else cb(new Error(`CORS: ${origin} not allowed`))
  },
  credentials: true,
}))

// ── Rate limiting ─────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 min
  max:      parseInt(process.env.RATE_LIMIT_MAX        || '100'),
  standardHeaders: true,
  legacyHeaders:   false,
  message: { message: 'Too many requests. Please try again later.' },
})
app.use('/api', limiter)

// ── Stricter limiter for auth endpoints ───────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts. Please wait 15 minutes.' },
})
app.use('/api/auth/login', authLimiter)

// ── Body parsing ──────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// ── Trust proxy (for VPS behind Nginx) ───────────────────────────
app.set('trust proxy', 1)

// ── Routes ───────────────────────────────────────────────────────
app.use('/api/appointments', appointmentsRouter)
app.use('/api/contact',      contactRouter)
app.use('/api/doctors',      doctorsRouter)
app.use('/api/auth',         authRouter)

// ── Health check ─────────────────────────────────────────────────
app.get('/health', (_, res) => {
  res.json({
    status:  'ok',
    service: "Meru Doctors' Plaza API",
    version: '1.0.0',
    uptime:  process.uptime(),
    time:    new Date().toISOString(),
  })
})

// ── 404 handler ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} not found` })
})

// ── Global error handler ─────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err)
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : err.message,
  })
})

// ── Start ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🏥  Meru Doctors' Plaza API`)
  console.log(`   Running on http://localhost:${PORT}`)
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`   Health: http://localhost:${PORT}/health\n`)
})

export default app
