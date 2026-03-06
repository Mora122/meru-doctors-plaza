import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Icon from '../components/Icon'
import { C, INPATIENT_SERVICES, OUTPATIENT_SERVICES, INSURERS, HOSPITAL } from '../utils/constants'

const TESTIMONIALS = [
  { name: 'Mary Wanjiku',  role: 'Maternity Patient',   rating: 5, text: 'The care I received during my delivery was exceptional. The nursing team was attentive and the facilities were world-class.' },
  { name: 'James Mwenda',  role: 'Radiology Patient',   rating: 5, text: 'Fast, accurate imaging results and a friendly radiologist who explained everything clearly. Highly recommend.' },
  { name: 'Faith Karimi',  role: 'Pediatrics Parent',   rating: 5, text: 'My son received outstanding pediatric care. The doctors were patient, thorough, and truly child-friendly.' },
]

const ARTICLES = [
  { tag: 'Maternal Health', title: 'Understanding Antenatal Care: A Guide for First-Time Mothers',         date: 'Feb 28, 2025', icon: 'baby'     },
  { tag: 'Pediatrics',      title: 'Childhood Vaccination Schedule: What Every Parent Should Know',        date: 'Feb 15, 2025', icon: 'heart'    },
  { tag: 'Nutrition',       title: 'Managing Diabetes Through Diet: Expert Advice from Our Specialists',  date: 'Feb 5, 2025',  icon: 'activity' },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Meru Doctors' Plaza Hospital | Level 4 Hospital in Meru County, Kenya</title>
        <meta name="description" content="Meru Doctors' Plaza is Meru County's leading Level 4 hospital. Advanced imaging, maternity, ENT, pediatrics, pharmacy, radiology and 24/7 emergency care." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div style={{
        minHeight: '100vh', paddingTop: 72,
        background: `linear-gradient(135deg,${C.navy} 0%,#0D3272 50%,#0B4D8A 100%)`,
        display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {[300,500,700].map((s,i) => (
          <div key={i} style={{
            position: 'absolute', right: -s/3+(i*60), top: '50%',
            transform: 'translateY(-50%)', width: s, height: s, borderRadius: '50%',
            border: `1px solid rgba(59,158,237,${0.12-i*0.03})`, pointerEvents: 'none',
          }} />
        ))}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(ellipse at 70% 50%,rgba(19,99,223,0.3) 0%,transparent 60%)`,
          pointerEvents: 'none',
        }} />

        <div className="hero-padding grid-responsive" style={{
          maxWidth: 1280, margin: '0 auto', width: '100%',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem', alignItems: 'center',
        }}>
          <div className="fade-up">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(46,204,138,0.15)', border: '1px solid rgba(46,204,138,0.3)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 24,
            }}>
              <div className="pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: C.mint }} />
              <span style={{ color: C.mint, fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>
                Level 4 Accredited Hospital · Meru County
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 800,
              color: '#fff', lineHeight: 1.15, marginBottom: 20,
            }}>
              Advanced Care,<br />
              <span style={{
                background: `linear-gradient(90deg,${C.sky},${C.mint})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Compassionate Heart</span>
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Meru Doctors' Plaza delivers world-class healthcare to the Mount Kenya region.
              From routine check-ups to advanced diagnostics, our expert team is committed to your wellbeing.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {[
                { label: 'Book Appointment', bg: `linear-gradient(135deg,${C.blue},${C.sky})`,   shadow: 'rgba(19,99,223,0.45)',  to: '/appointments' },
                { label: 'Find a Doctor',    bg: `linear-gradient(135deg,${C.mint},#1aad74)`,    shadow: 'rgba(46,204,138,0.4)',   to: '/doctors'      },
                { label: '🚨 Emergency',     bg: 'linear-gradient(135deg,#E84545,#c82020)',       shadow: 'rgba(232,69,69,0.45)',  to: '/contact'      },
              ].map(btn => (
                <button key={btn.label} onClick={() => navigate(btn.to)} style={{
                  background: btn.bg, color: '#fff', border: 'none', cursor: 'pointer',
                  padding: '14px 26px', borderRadius: 10, fontWeight: 700, fontSize: 15,
                  boxShadow: `0 6px 20px ${btn.shadow}`, transition: 'all 0.25s',
                }}>{btn.label}</button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
              {[['12,000+','Patients Served'],['45+','Specialist Doctors'],['24/7','Emergency Care'],['10+','Departments']].map(([n,l]) => (
                <div key={l}>
                  <div style={{ color: C.mint, fontWeight: 800, fontSize: 28, fontFamily: "'Playfair Display',serif" }}>{n}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 500, letterSpacing: 0.5 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div style={{ display: 'flex', justifyContent: 'center' }} className="fade-up">
            <div style={{
              width: 'clamp(280px,38vw,420px)', height: 'clamp(280px,38vw,420px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%,rgba(59,158,237,0.25),rgba(11,37,69,0.8))',
              border: '2px solid rgba(59,158,237,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <div style={{
                width: '80%', height: '80%', borderRadius: '50%',
                background: 'linear-gradient(135deg,rgba(19,99,223,0.4),rgba(46,204,138,0.2))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <img src="/logo.webp" alt="Meru Doctors' Plaza"
                  style={{ width: '65%', height: '65%', objectFit: 'contain',
                    filter: 'drop-shadow(0 0 24px rgba(46,204,138,0.5))' }} />
              </div>
              {[
                { top:'8%',    left:'5%',  icon:'shield',     label:'Accredited',     sub:'ISO Certified'  },
                { top:'8%',    right:'5%', icon:'activity',   label:'24/7 Emergency', sub:'Always Ready'   },
                { bottom:'8%', left:'5%',  icon:'microscope', label:'Lab Results',    sub:'Same Day'       },
                { bottom:'8%', right:'5%', icon:'calendar',   label:'Easy Booking',   sub:'Online & Walk-in'},
              ].map((b,i) => (
                <div key={i} style={{
                  position: 'absolute',
                  ...(b.top    ? {top:b.top}    : {}),
                  ...(b.bottom ? {bottom:b.bottom}: {}),
                  ...(b.left   ? {left:b.left}  : {}),
                  ...(b.right  ? {right:b.right} : {}),
                  background: 'rgba(11,37,69,0.9)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 12, padding: '10px 14px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  animation: `fadeUp 0.7s ease ${i*0.15+0.3}s both`,
                }}>
                  <Icon name={b.icon} size={20} color={C.mint} />
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 12 }}>{b.label}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section style={{ background: C.offWhite, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ color: C.blue, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Our Services</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: C.navy }}>
              Comprehensive Medical Services
            </h2>
            <p style={{ color: C.slate, maxWidth: 520, margin: '12px auto 0', lineHeight: 1.7 }}>
              From critical inpatient care to specialist outpatient clinics — all under one roof.
            </p>
          </div>

          {/* Inpatient */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`linear-gradient(135deg,${C.warn},#c82020)`, color:'#fff', fontWeight:800, fontSize:12, letterSpacing:1.5, textTransform:'uppercase', padding:'6px 16px', borderRadius:100, marginBottom:16, boxShadow:`0 4px 12px rgba(232,69,69,0.3)` }}>
              🏥 Inpatient Services
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 14 }}>
              {INPATIENT_SERVICES.map((s, i) => (
                <div key={s.id} className="card-hover" onClick={() => navigate('/services')}
                  style={{ background: C.white, borderRadius: 14, padding: '1.3rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(11,37,69,0.07)', border: '1px solid rgba(11,37,69,0.05)', borderLeft: `4px solid ${s.color}`, animation: `fadeUp 0.5s ease ${i*0.05}s both` }}>
                  <div style={{ width:42, height:42, borderRadius:10, background:`${s.color}18`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:10 }}>
                    <Icon name={s.icon} size={22} color={s.color} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Outpatient */}
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:'#fff', fontWeight:800, fontSize:12, letterSpacing:1.5, textTransform:'uppercase', padding:'6px 16px', borderRadius:100, marginBottom:16, boxShadow:`0 4px 12px rgba(19,99,223,0.3)` }}>
              🩺 Outpatient Services
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 14 }}>
              {OUTPATIENT_SERVICES.map((s, i) => (
                <div key={s.id} className="card-hover" onClick={() => navigate('/services')}
                  style={{ background: C.white, borderRadius: 14, padding: '1.3rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(11,37,69,0.07)', border: '1px solid rgba(11,37,69,0.05)', borderLeft: `4px solid ${s.color}`, animation: `fadeUp 0.5s ease ${i*0.05}s both` }}>
                  <div style={{ width:42, height:42, borderRadius:10, background:`${s.color}18`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:10 }}>
                    <Icon name={s.icon} size={22} color={s.color} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ────────────────────────────────────────── */}
      <section style={{ background: C.white, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div style={{ color: C.blue, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>About Us</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 800, color: C.navy, marginBottom: 20 }}>
              Pioneering Healthcare in the Mount Kenya Region
            </h2>
            <p style={{ color: C.slate, lineHeight: 1.8, marginBottom: 16 }}>
              Founded in 2010, Meru Doctors' Plaza has grown into the region's most trusted Level 4 facility.
              Our team of over 45 specialist doctors and 200+ support staff work tirelessly to deliver evidence-based, patient-centered care.
            </p>
            {[
              ['Mission', 'Deliver compassionate, evidence-based healthcare accessible to all.'],
              ['Vision',  'To be East Africa\'s leading Level 4 community hospital by 2030.'],
            ].map(([t, d]) => (
              <div key={t} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 4, background: `linear-gradient(180deg,${C.blue},${C.mint})`, borderRadius: 4, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, color: C.navy, marginBottom: 3 }}>{t}</div>
                  <div style={{ color: C.slate, fontSize: 14 }}>{d}</div>
                </div>
              </div>
            ))}
            <button onClick={() => navigate('/about')} style={{
              background: `linear-gradient(135deg,${C.blue},${C.sky})`,
              color: '#fff', border: 'none', cursor: 'pointer',
              padding: '12px 28px', borderRadius: 10, fontWeight: 700, fontSize: 14, marginTop: 12,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              Learn More <Icon name="arrowR" size={16} color="#fff" />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: 'shield',   title: 'ISO Certified',     desc: 'International quality standards', bg: C.light       },
              { icon: 'zap',      title: 'Modern Equipment',  desc: 'State-of-the-art diagnostics',    bg: '#E8F8F1'     },
              { icon: 'user',     title: 'Expert Doctors',    desc: 'Board-certified specialists',     bg: '#FFF5F5'     },
              { icon: 'clock',    title: '24/7 Emergency',    desc: 'Always available for you',        bg: '#FFFBEB'     },
            ].map(f => (
              <div key={f.title} style={{ background: f.bg, borderRadius: 16, padding: '1.4rem', boxShadow: '0 2px 12px rgba(11,37,69,0.06)' }}>
                <Icon name={f.icon} size={30} color={C.blue} />
                <div style={{ fontWeight: 700, color: C.navy, marginTop: 10, marginBottom: 5, fontSize: 14 }}>{f.title}</div>
                <div style={{ color: C.slate, fontSize: 12 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(135deg,${C.navy},#0D3272)`, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ color: C.mint, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Patient Stories</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 800, color: '#fff' }}>
              What Our Patients Say
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '2rem',
              }}>
                <Icon name="quote" size={32} color={C.mint} />
                <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, margin: '16px 0' }}>{t.text}</p>
                <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
                  {Array(t.rating).fill(0).map((_,j) => <Icon key={j} name="star" size={16} color="#FFD700" />)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: `linear-gradient(135deg,${C.blue},${C.mint})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, color: '#fff', fontSize: 18,
                  }}>{t.name[0]}</div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.offWhite, padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ color: C.blue, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Insurance Partners</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: C.navy, marginBottom: 8 }}>
            We Accept All Major Insurance Schemes
          </h2>
          <p style={{ color: C.slate, marginBottom: 32, fontSize: 14 }}>23 insurance partners including SHA, Jubilee, Britam, AAR, CIC, Equity and many more.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {INSURERS.map(ins => (
              <div key={ins} style={{
                background: C.white, border: `1px solid ${C.light}`, borderRadius: 10,
                padding: '8px 18px', fontWeight: 600, fontSize: 13, color: C.navy,
                boxShadow: '0 2px 8px rgba(11,37,69,0.06)',
              }}>{ins}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLES ─────────────────────────────────────────────── */}
      <section style={{ background: C.white, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ color: C.blue, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Health Education</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 800, color: C.navy }}>Latest Health Articles</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 24 }}>
            {ARTICLES.map(a => (
              <div key={a.title} className="card-hover" onClick={() => navigate('/blog')}
                style={{ background: C.offWhite, borderRadius: 16, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 20px rgba(11,37,69,0.06)' }}>
                <div style={{ height: 160, background: `linear-gradient(135deg,${C.blue},${C.sky})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={a.icon} size={60} color="rgba(255,255,255,0.25)" />
                </div>
                <div style={{ padding: '1.4rem' }}>
                  <div style={{ display: 'inline-block', background: C.light, color: C.blue, fontSize: 11, fontWeight: 700, letterSpacing: 1, padding: '3px 10px', borderRadius: 100, marginBottom: 10 }}>{a.tag}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, lineHeight: 1.4, marginBottom: 10 }}>{a.title}</div>
                  <div style={{ color: C.slate, fontSize: 12 }}>{a.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={() => navigate('/blog')} style={{
              background: 'none', border: `2px solid ${C.blue}`, color: C.blue,
              cursor: 'pointer', padding: '12px 32px', borderRadius: 10, fontWeight: 700, fontSize: 14,
            }}>View All Articles</button>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(135deg,${C.blue},${C.mint})`, padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
          Your Health Is Our Priority
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 28 }}>Book an appointment today and experience world-class care.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/appointments')} style={{
            background: '#fff', color: C.blue, border: 'none', cursor: 'pointer',
            padding: '13px 32px', borderRadius: 10, fontWeight: 800, fontSize: 15,
          }}>Book Appointment</button>
          <a href={`tel:${HOSPITAL.emergency.replace(/\s/g,'')}`} style={{
            background: 'rgba(255,255,255,0.2)', color: '#fff',
            border: '2px solid rgba(255,255,255,0.5)',
            padding: '13px 32px', borderRadius: 10, fontWeight: 700, fontSize: 15,
            textDecoration: 'none', display: 'inline-block',
          }}>📞 Emergency: {HOSPITAL.emergency}</a>
        </div>
      </section>
    </>
  )
}
