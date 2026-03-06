import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pg

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME     || 'meru_doctors_plaza',
  user:     process.env.DB_USER     || 'mdp_user',
  password: process.env.DB_PASSWORD,
  max:      20,                      // max connections in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

pool.on('error', (err) => {
  console.error('PostgreSQL pool error:', err)
})

export const query = (text, params) => pool.query(text, params)
export default pool
