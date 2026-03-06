import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { C } from '../utils/constants'
import Icon from '../components/Icon'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Meru Doctors' Plaza Hospital</title>
      </Helmet>
      <div style={{
        minHeight: '100vh', paddingTop: 72,
        background: `linear-gradient(135deg,${C.navy},#0D3272)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '6rem 2rem',
      }}>
        <div>
          <div style={{
            fontSize: '8rem', fontWeight: 900, color: 'rgba(255,255,255,0.06)',
            fontFamily: "'Playfair Display',serif", lineHeight: 1, marginBottom: -20,
          }}>404</div>
          <Icon name="alertCircle" size={64} color={C.warn} />
          <h1 style={{
            fontFamily: "'Playfair Display',serif", fontWeight: 800,
            color: '#fff', fontSize: '2rem', margin: '20px 0 12px',
          }}>Page Not Found</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 32, fontSize: 16 }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" style={{
              background: `linear-gradient(135deg,${C.blue},${C.sky})`,
              color: '#fff', textDecoration: 'none',
              padding: '12px 28px', borderRadius: 10, fontWeight: 700,
            }}>← Back to Home</Link>
            <Link to="/contact" style={{
              background: 'rgba(255,255,255,0.1)', color: '#fff',
              border: '2px solid rgba(255,255,255,0.3)',
              textDecoration: 'none', padding: '12px 28px', borderRadius: 10, fontWeight: 700,
            }}>Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  )
}
