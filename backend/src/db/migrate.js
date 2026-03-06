import pool from './index.js'

async function migrate() {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    // ── patients ──────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id          SERIAL PRIMARY KEY,
        name        VARCHAR(200) NOT NULL,
        email       VARCHAR(255) UNIQUE,
        phone       VARCHAR(20)  NOT NULL,
        dob         DATE,
        password    VARCHAR(255),
        insurance   VARCHAR(100),
        created_at  TIMESTAMPTZ DEFAULT NOW(),
        updated_at  TIMESTAMPTZ DEFAULT NOW()
      );
    `)

    // ── departments ────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id          SERIAL PRIMARY KEY,
        slug        VARCHAR(50)  UNIQUE NOT NULL,
        name        VARCHAR(150) NOT NULL,
        description TEXT,
        icon        VARCHAR(50),
        color       VARCHAR(10),
        active      BOOLEAN DEFAULT TRUE
      );
    `)

    // ── doctors ────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS doctors (
        id              SERIAL PRIMARY KEY,
        name            VARCHAR(200) NOT NULL,
        specialization  VARCHAR(150) NOT NULL,
        department_id   INTEGER REFERENCES departments(id),
        experience_yrs  INTEGER,
        consultation_hours VARCHAR(100),
        available_today BOOLEAN DEFAULT TRUE,
        bio             TEXT,
        photo_url       VARCHAR(500),
        created_at      TIMESTAMPTZ DEFAULT NOW()
      );
    `)

    // ── appointments ──────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id           SERIAL PRIMARY KEY,
        reference    VARCHAR(20)  UNIQUE NOT NULL,
        patient_name VARCHAR(200) NOT NULL,
        patient_phone VARCHAR(20) NOT NULL,
        patient_email VARCHAR(255),
        patient_dob  DATE,
        insurance    VARCHAR(100),
        department   VARCHAR(150) NOT NULL,
        doctor_id    INTEGER REFERENCES doctors(id),
        appt_date    DATE        NOT NULL,
        appt_time    VARCHAR(20) NOT NULL,
        reason       TEXT,
        status       VARCHAR(20)  DEFAULT 'pending'
                     CHECK (status IN ('pending','confirmed','completed','cancelled')),
        created_at   TIMESTAMPTZ  DEFAULT NOW(),
        updated_at   TIMESTAMPTZ  DEFAULT NOW()
      );
    `)

    // ── contact_inquiries ─────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id          SERIAL PRIMARY KEY,
        name        VARCHAR(200) NOT NULL,
        email       VARCHAR(255),
        phone       VARCHAR(20),
        subject     VARCHAR(255),
        message     TEXT NOT NULL,
        status      VARCHAR(20) DEFAULT 'new'
                    CHECK (status IN ('new','read','replied')),
        created_at  TIMESTAMPTZ DEFAULT NOW()
      );
    `)

    // ── indexes for performance ───────────────────────────────────
    await client.query(`CREATE INDEX IF NOT EXISTS idx_appointments_date     ON appointments(appt_date);`)
    await client.query(`CREATE INDEX IF NOT EXISTS idx_appointments_status   ON appointments(status);`)
    await client.query(`CREATE INDEX IF NOT EXISTS idx_appointments_phone    ON appointments(patient_phone);`)
    await client.query(`CREATE INDEX IF NOT EXISTS idx_patients_phone        ON patients(phone);`)

    await client.query('COMMIT')
    console.log('✅  Database migration complete')
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('❌  Migration failed:', err)
    process.exit(1)
  } finally {
    client.release()
    pool.end()
  }
}

migrate()
