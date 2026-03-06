import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST || 'smtp.gmail.com',
  port:   parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const FROM = process.env.EMAIL_FROM || "Meru Doctors' Plaza <noreply@merudoctorsplaza.co.ke>"
const ADMIN_EMAIL = process.env.SMTP_USER

// ── Appointment confirmation to patient ──────────────────────────
export async function sendAppointmentConfirmation({ name, email, reference, department, appt_date, appt_time }) {
  if (!process.env.SMTP_USER) return // Skip if not configured

  await transporter.sendMail({
    from:    FROM,
    to:      email,
    subject: `Appointment Confirmed — ${reference} | Meru Doctors' Plaza`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;">
        <img src="https://merudoctorsplaza.co.ke/logo.webp" alt="Logo" style="height:56px;margin-bottom:16px;" />
        <h2 style="color:#0B2545;">Appointment Request Received</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Your appointment request has been received. Here are your details:</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          ${[
            ['Reference',  reference],
            ['Department', department],
            ['Date',       appt_date],
            ['Time',       appt_time],
          ].map(([k,v]) => `
            <tr>
              <td style="padding:8px 12px;background:#EAF1FB;font-weight:700;color:#5A6E8C;font-size:13px;">${k}</td>
              <td style="padding:8px 12px;background:#F4F8FF;color:#0B2545;font-weight:600;">${v}</td>
            </tr>
          `).join('')}
        </table>
        <p style="color:#5A6E8C;font-size:13px;">Our team will call you to confirm the appointment. For emergencies, call <strong>+254 700 000 911</strong>.</p>
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #EAF1FB;color:#5A6E8C;font-size:12px;">
          Meru Doctors' Plaza Hospital · Njuri-Ncheke Street, Meru Town
        </div>
      </div>
    `,
  })
}

// ── Contact inquiry notification to hospital team ────────────────
export async function sendContactNotification({ name, email, phone, subject, message }) {
  if (!ADMIN_EMAIL) return

  await transporter.sendMail({
    from:    FROM,
    to:      ADMIN_EMAIL,
    subject: `New Contact Inquiry: ${subject || 'No subject'} — from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;">
        <h2 style="color:#0B2545;">New Website Inquiry</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <hr/>
        <p style="white-space:pre-wrap;">${message}</p>
      </div>
    `,
  })
}
