import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { C } from '../utils/constants'
import { useApi } from '../hooks/useApi'
import Icon from '../components/Icon'

const TABS = [
  { key:'dashboard',     label:'Dashboard',     icon:'activity'   },
  { key:'appointments',  label:'Appointments',  icon:'calendar'   },
  { key:'prescriptions', label:'Prescriptions', icon:'pill'       },
  { key:'results',       label:'Lab Results',   icon:'microscope' },
  { key:'messages',      label:'Messages',      icon:'chat'       },
]

function LoginForm({ onLogin }) {
  const [form,   setForm]   = useState({ email:'', password:'' })
  const [errors, setErrors] = useState({})
  const { post, loading, error } = useApi()

  const set = (k,v) => setForm(f => ({...f,[k]:v}))

  const handleSubmit = async () => {
    const e = {}
    if (!form.email)    e.email    = 'Email is required'
    if (!form.password) e.password = 'Password is required'
    if (Object.keys(e).length) { setErrors(e); return }
    try {
      const res = await post('/api/auth/login', form)
      localStorage.setItem('mdp_token', res.token)
      onLogin(res.patient)
    } catch {
      setErrors({ password: 'Invalid email or password' })
    }
  }

  return (
    <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem' }}>
      <div style={{ width:'100%', maxWidth:420, background:C.white, borderRadius:20, padding:'2.5rem', boxShadow:'0 8px 40px rgba(11,37,69,0.1)' }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ width:64, height:64, borderRadius:'50%', background:`linear-gradient(135deg,${C.blue},${C.mint})`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
            <Icon name="lock" size={28} color="#fff" />
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, color:C.navy }}>Patient Portal Login</h2>
          <p style={{ color:C.slate, fontSize:13, marginTop:6 }}>Access your health records securely</p>
        </div>

        {[
          { label:'Email Address', key:'email',    type:'email',    ph:'patient@example.com' },
          { label:'Password',      key:'password', type:'password', ph:'••••••••'            },
        ].map(f => (
          <div key={f.key} style={{ marginBottom:18 }}>
            <label style={{ display:'block', fontWeight:600, color:C.navy, marginBottom:6, fontSize:14 }}>{f.label}</label>
            <input type={f.type} placeholder={f.ph} value={form[f.key]} onChange={e => set(f.key, e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{ width:'100%', padding:'12px 16px', borderRadius:10, border:`2px solid ${errors[f.key] ? C.warn : C.light}`, fontSize:14, color:C.navy }} />
            {errors[f.key] && <div style={{ color:C.warn, fontSize:12, marginTop:4 }}>{errors[f.key]}</div>}
          </div>
        ))}

        {error && <div style={{ background:'#FFF5F5', border:`1px solid ${C.warn}`, borderRadius:8, padding:'10px 14px', color:C.warn, fontSize:13, marginBottom:16 }}>{error}</div>}

        <button onClick={handleSubmit} disabled={loading} style={{
          width:'100%', background:`linear-gradient(135deg,${C.blue},${C.sky})`,
          color:'#fff', border:'none', cursor: loading ? 'not-allowed' : 'pointer',
          padding:14, borderRadius:10, fontWeight:700, fontSize:15, opacity: loading ? 0.7 : 1,
        }}>{loading ? 'Signing in…' : 'Sign In'}</button>

        <div style={{ textAlign:'center', marginTop:16, color:C.slate, fontSize:13 }}>
          Don't have an account? Visit the reception desk or call{' '}
          <a href="tel:+254700000100" style={{ color:C.blue, fontWeight:600 }}>+254 700 000 100</a>
        </div>
      </div>
    </div>
  )
}

function Dashboard({ patient }) {
  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:16, marginBottom:24 }}>
        {[
          { label:'Upcoming Appointments', value:'2', icon:'calendar',   color:C.blue   },
          { label:'Active Prescriptions',  value:'3', icon:'pill',       color:C.mint   },
          { label:'Pending Results',        value:'1', icon:'microscope', color:'#7C3AED'},
          { label:'Unread Messages',        value:'4', icon:'chat',       color:'#F59E0B'},
        ].map(card => (
          <div key={card.label} style={{ background:C.white, borderRadius:16, padding:'1.4rem', boxShadow:'0 4px 20px rgba(11,37,69,0.07)', borderLeft:`4px solid ${card.color}` }}>
            <Icon name={card.icon} size={28} color={card.color} />
            <div style={{ fontWeight:800, fontSize:28, color:C.navy, margin:'8px 0 4px' }}>{card.value}</div>
            <div style={{ color:C.slate, fontSize:12 }}>{card.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background:C.white, borderRadius:16, padding:'1.8rem', boxShadow:'0 4px 20px rgba(11,37,69,0.07)' }}>
        <h3 style={{ fontWeight:800, color:C.navy, marginBottom:16 }}>Recent Activity</h3>
        {[
          { action:'Lab results ready',     detail:'Complete Blood Count',   date:'Today 9:30 AM', type:'microscope' },
          { action:'Appointment confirmed', detail:'Pediatrics – Dr. Esther', date:'Yesterday',    type:'calendar'   },
          { action:'Prescription refill',   detail:'Metformin 500mg',        date:'Dec 10, 2024', type:'pill'       },
        ].map(a => (
          <div key={a.action} style={{ display:'flex', gap:12, padding:'12px 0', borderBottom:`1px solid ${C.light}` }}>
            <div style={{ width:36, height:36, borderRadius:'50%', background:C.light, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon name={a.type} size={16} color={C.blue} />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, color:C.navy, fontSize:14 }}>{a.action}</div>
              <div style={{ color:C.slate, fontSize:12 }}>{a.detail}</div>
            </div>
            <div style={{ color:C.slate, fontSize:12, whiteSpace:'nowrap' }}>{a.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PatientPortalPage() {
  const [patient, setPatient] = useState(null)
  const [tab, setTab]         = useState('dashboard')

  useEffect(() => {
    const token = localStorage.getItem('mdp_token')
    if (token) {
      // In production, verify token with GET /api/auth/me
      const stored = localStorage.getItem('mdp_patient')
      if (stored) setPatient(JSON.parse(stored))
    }
  }, [])

  const handleLogin = (p) => {
    setPatient(p)
    localStorage.setItem('mdp_patient', JSON.stringify(p))
  }

  const handleLogout = () => {
    setPatient(null)
    localStorage.removeItem('mdp_token')
    localStorage.removeItem('mdp_patient')
  }

  return (
    <>
      <Helmet>
        <title>Patient Portal | Meru Doctors' Plaza Hospital</title>
        <meta name="description" content="Access your Meru Doctors' Plaza patient portal — view appointments, lab results, prescriptions and communicate with your care team." />
      </Helmet>
      <div style={{ paddingTop:72, minHeight:'100vh', background:C.offWhite }}>
        <div style={{ background:`linear-gradient(135deg,${C.navy},#0D3272)`, padding:'3rem 2rem' }}>
          <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:16 }}>
              <div style={{ width:56, height:56, borderRadius:'50%', background:`linear-gradient(135deg,${C.blue},${C.mint})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:800, color:'#fff' }}>
                {patient ? patient.name[0] : '?'}
              </div>
              <div>
                <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, color:'#fff', fontSize:'1.6rem' }}>
                  {patient ? `Welcome back, ${patient.name}` : 'Patient Portal'}
                </h1>
                <div style={{ color:'rgba(255,255,255,0.6)', fontSize:13 }}>
                  {patient ? `Patient ID: ${patient.id || 'MDP-001'}` : 'Secure health record access'}
                </div>
              </div>
            </div>
            {patient && (
              <button onClick={handleLogout} style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.3)', color:'#fff', cursor:'pointer', padding:'8px 20px', borderRadius:8, fontWeight:600, fontSize:13 }}>
                Sign Out
              </button>
            )}
          </div>
        </div>

        {!patient ? <LoginForm onLogin={handleLogin} /> : (
          <div style={{ maxWidth:1100, margin:'2rem auto', padding:'0 2rem', display:'grid', gridTemplateColumns:'220px 1fr', gap:24 }}>
            {/* Sidebar */}
            <div style={{ background:C.white, borderRadius:16, padding:'1rem', height:'fit-content', boxShadow:'0 4px 20px rgba(11,37,69,0.07)' }}>
              {TABS.map(t => (
                <button key={t.key} onClick={() => setTab(t.key)} style={{
                  display:'flex', alignItems:'center', gap:12, width:'100%',
                  background: tab===t.key ? C.light : 'transparent',
                  color: tab===t.key ? C.blue : C.navy,
                  border: tab===t.key ? `2px solid ${C.blue}` : '2px solid transparent',
                  borderRadius:10, padding:'11px 14px', cursor:'pointer', marginBottom:4,
                  fontWeight: tab===t.key ? 700 : 500, fontSize:14, transition:'all 0.2s',
                }}>
                  <Icon name={t.icon} size={18} color={tab===t.key ? C.blue : C.slate} />
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div key={tab} className="fade-up">
              {tab === 'dashboard' && <Dashboard patient={patient} />}
              {tab === 'appointments' && (
                <div style={{ background:C.white, borderRadius:16, padding:'1.8rem', boxShadow:'0 4px 20px rgba(11,37,69,0.07)' }}>
                  <h3 style={{ fontWeight:800, color:C.navy, marginBottom:20 }}>My Appointments</h3>
                  {[
                    { dept:'Pediatrics', doc:'Dr. Esther Nkatha', date:'Jan 15, 2025', time:'10:00 AM', status:'Confirmed' },
                    { dept:'Radiology',  doc:'Dr. Peter Kirimi',  date:'Jan 22, 2025', time:'2:00 PM',  status:'Pending'   },
                    { dept:'ENT Clinic', doc:'Dr. Moses Gitonga', date:'Dec 5, 2024',  time:'9:00 AM',  status:'Completed' },
                  ].map(a => (
                    <div key={a.date+a.dept} style={{ background:C.offWhite, borderRadius:12, padding:'1.2rem', marginBottom:14, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
                      <div>
                        <div style={{ fontWeight:700, color:C.navy }}>{a.dept}</div>
                        <div style={{ color:C.slate, fontSize:13 }}>{a.doc}</div>
                      </div>
                      <div style={{ textAlign:'center' }}>
                        <div style={{ fontWeight:700, color:C.navy, fontSize:13 }}>{a.date}</div>
                        <div style={{ color:C.slate, fontSize:12 }}>{a.time}</div>
                      </div>
                      <div style={{ padding:'4px 12px', borderRadius:100, fontSize:12, fontWeight:700, background: a.status==='Confirmed'?`${C.mint}20`:a.status==='Pending'?`${C.blue}15`:'#F3F4F6', color: a.status==='Confirmed'?C.mint:a.status==='Pending'?C.blue:C.slate }}>
                        {a.status}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {['prescriptions','results','messages'].includes(tab) && (
                <div style={{ background:C.white, borderRadius:16, padding:'2.5rem', textAlign:'center', boxShadow:'0 4px 20px rgba(11,37,69,0.07)' }}>
                  <Icon name={tab==='prescriptions'?'pill':tab==='results'?'microscope':'chat'} size={56} color={C.light} />
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, color:C.navy, marginTop:16, marginBottom:8 }}>
                    {tab === 'prescriptions' ? 'Active Prescriptions' : tab === 'results' ? 'Lab Results' : 'Messages'}
                  </h3>
                  <p style={{ color:C.slate }}>Your records will appear here once available. Contact reception for assistance.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
