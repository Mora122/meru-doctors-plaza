import { Link } from 'react-router-dom'
import Icon from './Icon'
import { C, HOSPITAL } from '../utils/constants'

const FOOTER_LINKS = {
  Services: [
    { label: 'Imaging & Radiology', to: '/services' },
    { label: 'Pharmacy',            to: '/services' },
    { label: 'ENT Clinic',          to: '/services' },
    { label: 'Obstetrics & Gynecology', to: '/services' },
    { label: 'Pediatrics',          to: '/services' },
    { label: 'Laboratory',          to: '/services' },
    { label: 'Dental Care',         to: '/services' },
    { label: 'Physiotherapy',       to: '/services' },
  ],
  Hospital: [
    { label: 'About Us',           to: '/about'        },
    { label: 'Our Doctors',        to: '/doctors'      },
    { label: 'Appointments',       to: '/appointments' },
    { label: 'Patient Portal',     to: '/portal'       },
    { label: 'Health Blog',        to: '/blog'         },
    { label: 'Contact Us',         to: '/contact'      },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: C.navy, color: 'rgba(255,255,255,0.7)', padding: '4rem 2rem 2rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 32, marginBottom: 36 }}>

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="/logo.webp" alt="Meru Doctors' Plaza logo"
                style={{ height: 46, width: 46, objectFit: 'contain', borderRadius: 6 }} />
              <span style={{ color: '#fff', fontWeight: 800, fontFamily: "'Playfair Display',serif", fontSize: 15 }}>
                Meru Doctors' Plaza
              </span>
            </div>
            <p style={{ lineHeight: 1.7, fontSize: 13, marginBottom: 16 }}>
              Level 4 hospital serving Meru County with advanced, compassionate healthcare since 2010.
            </p>
            <a href={`tel:${HOSPITAL.emergency.replace(/\s/g,'')}`}
              style={{ color: C.warn, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'block', marginBottom: 6 }}>
              🚨 Emergency: {HOSPITAL.emergency}
            </a>
            <a href={`tel:${HOSPITAL.phone.replace(/\s/g,'')}`}
              style={{ color: C.sky, fontSize: 13, textDecoration: 'none' }}>
              📞 {HOSPITAL.phone}
            </a>

            {/* Social */}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              {[
                { name: 'facebook',  color: '#1877F2', href: HOSPITAL.social.facebook  },
                { name: 'twitter',   color: '#1DA1F2', href: HOSPITAL.social.twitter   },
                { name: 'instagram', color: '#E1306C', href: HOSPITAL.social.instagram },
              ].map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer"
                  aria-label={s.name}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: `${s.color}20`, border: `1px solid ${s.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  <Icon name={s.name} size={16} color={s.color} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <div style={{ color: '#fff', fontWeight: 700, marginBottom: 14, fontSize: 14 }}>{title}</div>
              {links.map(l => (
                <Link key={l.label} to={l.to} style={{
                  display: 'block', fontSize: 13, marginBottom: 8,
                  color: 'rgba(255,255,255,0.65)', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                  onMouseOver={e => e.target.style.color = '#fff'}
                  onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
                >{l.label}</Link>
              ))}
            </div>
          ))}

          {/* Hours column */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 14, fontSize: 14 }}>
              <Icon name="clock" size={14} color={C.sky} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              Opening Hours
            </div>
            {HOSPITAL.hours.map(h => (
              <div key={h.day} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.07)', fontSize: 12,
              }}>
                <span>{h.day}</span>
                <span style={{ color: h.day === 'Emergency Dept' ? C.warn : '#fff', fontWeight: 600 }}>{h.time}</span>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
                <Icon name="mapPin" size={13} color={C.sky} /> Location
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.6 }}>{HOSPITAL.address}</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 20,
          display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12, fontSize: 12,
        }}>
          <span>© {new Date().getFullYear()} Meru Doctors' Plaza Hospital. All rights reserved.</span>
          <span>KMPDC Licensed · ISO 9001:2015 · NHIF Accredited</span>
        </div>
      </div>
    </footer>
  )
}
