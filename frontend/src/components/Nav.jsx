import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { C, HOSPITAL } from '../utils/constants'

const NAV_LINKS = [
  { to: '/',          label: 'Home'           },
  { to: '/about',     label: 'About'          },
  { to: '/services',  label: 'Services'       },
  { to: '/doctors',   label: 'Doctors'        },
  { to: '/appointments', label: 'Appointments'},
  { to: '/portal',    label: 'Patient Portal' },
  { to: '/blog',      label: 'Blog'           },
  { to: '/contact',   label: 'Contact'        },
]

export default function Nav() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate              = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  const handleNav = () => setOpen(false)

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="nav-responsive"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(11,37,69,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        transition: 'all 0.3s',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
      }}
    >
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 72,
      }}>
        {/* Logo */}
        <Link
          to="/"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
          aria-label="Meru Doctors Plaza — Home"
        >
          <img
            src="/logo.webp"
            alt="Meru Doctors' Plaza Hospital logo"
            style={{ height: 52, width: 52, objectFit: 'contain', borderRadius: 8, flexShrink: 0 }}
          />
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 16, fontFamily: "'Playfair Display',serif", lineHeight: 1.1 }}>
              Meru Doctors' Plaza
            </div>
            <div style={{ color: C.mint, fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
              {HOSPITAL.tagline}
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              style={({ isActive }) => ({
                color: isActive ? C.mint : 'rgba(255,255,255,0.82)',
                fontWeight: isActive ? 700 : 500,
                fontSize: 13.5,
                padding: '6px 10px',
                borderRadius: 6,
                textDecoration: 'none',
                borderBottom: isActive ? `2px solid ${C.mint}` : '2px solid transparent',
                transition: 'all 0.2s',
                letterSpacing: 0.2,
              })}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={() => navigate('/appointments')}
            style={{
              background: `linear-gradient(135deg,${C.blue},${C.sky})`,
              color: '#fff', border: 'none', cursor: 'pointer',
              padding: '9px 18px', borderRadius: 8, fontWeight: 700,
              fontSize: 13, marginLeft: 8,
              boxShadow: `0 4px 14px rgba(19,99,223,0.4)`,
              transition: 'all 0.2s',
            }}
          >
            Book Now
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 4 }}
        >
          <Icon name={open ? 'x' : 'menu'} size={26} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'rgba(11,37,69,0.98)',
          padding: '0.5rem 2rem 1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={handleNav}
              style={({ isActive }) => ({
                display: 'block',
                color: isActive ? C.mint : 'rgba(255,255,255,0.85)',
                fontWeight: isActive ? 700 : 500,
                fontSize: 15,
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                textDecoration: 'none',
              })}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={`tel:${HOSPITAL.emergency.replace(/\s/g,'')}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginTop: 16, color: '#ff6b6b', fontWeight: 700, textDecoration: 'none',
            }}
          >
            🚨 Emergency: {HOSPITAL.emergency}
          </a>
        </div>
      )}
    </nav>
  )
}
