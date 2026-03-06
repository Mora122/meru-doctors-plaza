import jwt from 'jsonwebtoken'

export function authRequired(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' })
  }
  const token = header.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.patient = payload
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export function adminRequired(req, res, next) {
  authRequired(req, res, () => {
    if (req.patient?.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' })
    }
    next()
  })
}
