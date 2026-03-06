import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { C } from '../utils/constants'
import { useApi } from '../hooks/useApi'
import Icon from '../components/Icon'

// Fallback static data used when backend is unavailable
const STATIC_DOCTORS = [
  { id:1,  name:'Dr. Samuel Mutua',   spec:'Internal Medicine',    dept:'Internal Medicine',       exp:'18 yrs', hours:'Mon–Fri 8am–4pm',  available:true  },
  { id:2,  name:'Dr. Grace Njiru',    spec:'OB-GYN',               dept:'Obstetrics & Gynecology', exp:'15 yrs', hours:'Mon–Sat 8am–5pm',  available:true  },
  { id:3,  name:'Dr. Peter Kirimi',   spec:'Radiology',            dept:'Imaging & Radiology',     exp:'12 yrs', hours:'Mon–Fri 7am–6pm',  available:true  },
  { id:4,  name:'Dr. Esther Nkatha',  spec:'Pediatrics',           dept:'Pediatrics',              exp:'10 yrs', hours:'Mon–Fri 8am–4pm',  available:false },
  { id:5,  name:'Dr. Moses Gitonga',  spec:'ENT',                  dept:'ENT Clinic',              exp:'14 yrs', hours:'Tue/Thu 9am–5pm',  available:true  },
  { id:6,  name:'Dr. Priscilla Mwai', spec:'Dental Surgery',       dept:'Dental Care',             exp:'9 yrs',  hours:'Mon–Fri 8am–4pm',  available:true  },
  { id:7,  name:'Dr. Jane Muriuki',   spec:'Maternal-Fetal Med',   dept:'Obstetrics & Gynecology', exp:'11 yrs', hours:'Mon/Wed/Fri',       available:false },
  { id:8,  name:'Dr. Clement Mugo',   spec:'Neonatology',          dept:'Pediatrics',              exp:'8 yrs',  hours:'Mon–Sat 8am–4pm',  available:true  },
  { id:9,  name:'Dr. Caroline Nyaga', spec:'Pathology',            dept:'Laboratory',              exp:'13 yrs', hours:'Mon–Fri 8am–4pm',  available:true  },
  { id:10, name:'Dr. Anthony Kiiru',  spec:'Orthodontics',         dept:'Dental Care',             exp:'7 yrs',  hours:'Wed/Thu/Fri',       available:true  },
  { id:11, name:'Dr. Agnes Mwiti',    spec:'Radiology',            dept:'Imaging & Radiology',     exp:'10 yrs', hours:'Mon–Fri 7am–5pm',  available:false },
  { id:12, name:'Dr. Tabitha Irungu', spec:'Audiology',            dept:'ENT Clinic',              exp:'8 yrs',  hours:'Mon/Tue/Thu',       available:true  },
]

export default function DoctorsPage() {
  const [filter, setFilter]   = useState('All')
  const [doctors, setDoctors] = useState(STATIC_DOCTORS)
  const navigate              = useNavigate()
  const { get, loading }      = useApi()

  useEffect(() => {
    get('/api/doctors')
      .then(data => setDoctors(data.doctors || STATIC_DOCTORS))
      .catch(() => setDoctors(STATIC_DOCTORS)) // graceful fallback
  }, [])

  const depts    = ['All', ...new Set(doctors.map(d => d.dept))]
  const filtered = filter === 'All' ? doctors : doctors.filter(d => d.dept === filter)

  return (
    <>
      <Helmet>
        <title>Our Doctors | Meru Doctors' Plaza Hospital</title>
        <meta name="description" content="Meet Meru Doctors' Plaza Hospital's specialist doctors — experienced consultants in radiology, obstetrics, pediatrics, ENT, dentistry, and more in Meru County." />
      </Helmet>
      <div style={{ paddingTop: 72 }}>
        <div style={{ background: `linear-gradient(135deg,${C.navy},#0D3272)`, padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ color: C.mint, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Our Team</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
            Meet Our Specialists
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16 }}>45+ board-certified doctors committed to your health</p>
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 2rem' }}>
          {/* Filter bar */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }} role="group" aria-label="Filter by department">
            {depts.map(d => (
              <button key={d} onClick={() => setFilter(d)} style={{
                background: filter === d ? C.blue : C.white,
                color: filter === d ? '#fff' : C.navy,
                border: `2px solid ${filter === d ? C.blue : C.light}`,
                cursor: 'pointer', padding: '7px 18px', borderRadius: 100,
                fontWeight: 600, fontSize: 13, transition: 'all 0.2s',
              }}>{d}</button>
            ))}
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '3rem', color: C.slate }}>Loading doctors...</div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 24 }}>
            {filtered.map(d => (
              <article key={d.id} className="card-hover" style={{
                background: C.white, borderRadius: 20, padding: '2rem',
                boxShadow: '0 4px 20px rgba(11,37,69,0.07)',
                border: '1px solid rgba(11,37,69,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: `linear-gradient(135deg,${C.blue},${C.mint})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, fontWeight: 800, color: '#fff', flexShrink: 0,
                  }}>{d.name.split(' ')[1][0]}</div>
                  <div>
                    <div style={{ fontWeight: 800, color: C.navy, fontSize: 15 }}>{d.name}</div>
                    <div style={{ color: C.blue, fontWeight: 600, fontSize: 13 }}>{d.spec}</div>
                  </div>
                </div>

                <div style={{ display: 'inline-block', background: C.light, color: C.blue, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100, marginBottom: 12 }}>
                  {d.dept}
                </div>

                <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <Icon name="clock" size={14} color={C.slate} />
                  <span style={{ fontSize: 12, color: C.slate }}>{d.hours}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <Icon name="user" size={14} color={C.slate} />
                  <span style={{ fontSize: 12, color: C.slate }}>{d.exp} experience</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.available ? C.mint : C.warn }} />
                  <span style={{ fontSize: 12, color: d.available ? C.mint : C.warn, fontWeight: 600 }}>
                    {d.available ? 'Available Today' : 'Not Available Today'}
                  </span>
                </div>

                <button onClick={() => navigate('/appointments')} style={{
                  width: '100%', background: `linear-gradient(135deg,${C.blue},${C.sky})`,
                  color: '#fff', border: 'none', cursor: 'pointer',
                  padding: '10px', borderRadius: 10, fontWeight: 700, fontSize: 13,
                }}>Book Appointment</button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
