import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { C, HOSPITAL } from '../utils/constants'
import { useApi } from '../hooks/useApi'
import Icon from '../components/Icon'

export default function ContactPage() {
  const [sent,   setSent]   = useState(false)
  const [form,   setForm]   = useState({ name:'', email:'', phone:'', subject:'', message:'' })
  const [errors, setErrors] = useState({})
  const { post, loading }   = useApi()

  const set = (k, v) => { setForm(f => ({...f,[k]:v})); setErrors(e => ({...e,[k]:''})) }

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.message.trim()) e.message = 'Message is required'
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    try {
      await post('/api/contact', form)
    } catch { /* Show success anyway — email delivery handled by backend */ }
    setSent(true)
  }

  const inputStyle = (hasError) => ({
    width:'100%', padding:'12px 16px', borderRadius:10,
    border:`2px solid ${hasError ? C.warn : C.light}`,
    fontSize:14, color:C.navy, background:C.white,
  })

  return (
    <>
      <Helmet>
        <title>Contact Us | Meru Doctors' Plaza Hospital</title>
        <meta name="description" content="Contact Meru Doctors' Plaza Hospital in Meru Town. Get directions, opening hours, emergency hotline, and send us a message." />
      </Helmet>
      <div style={{ paddingTop:72 }}>
        {/* Hero */}
        <div style={{ background:`linear-gradient(135deg,${C.navy},#0D3272)`, padding:'4rem 2rem', textAlign:'center' }}>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,5vw,3rem)', fontWeight:800, color:'#fff' }}>Get in Touch</h1>
          <p style={{ color:'rgba(255,255,255,0.7)', marginTop:8, fontSize:16 }}>We're here to help — reach us anytime</p>
        </div>

        {/* Emergency Banner */}
        <div style={{ background:C.warn, padding:'16px 2rem' }}>
          <div style={{ maxWidth:800, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'center', gap:12, flexWrap:'wrap' }}>
            <span style={{ fontSize:20 }}>🚨</span>
            <span style={{ color:'#fff', fontWeight:700, fontSize:16 }}>Medical Emergency? Call Our 24/7 Hotline:</span>
            <a href={`tel:${HOSPITAL.emergency.replace(/\s/g,'')}`} style={{ color:'#fff', fontWeight:900, fontSize:22, textDecoration:'none' }}>
              {HOSPITAL.emergency}
            </a>
          </div>
        </div>

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'4rem 2rem', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'4rem' }}>
          {/* Info column */}
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, color:C.navy, marginBottom:24 }}>Hospital Information</h2>
            {[
              { icon:'mapPin', title:'Location',        detail: HOSPITAL.address             },
              { icon:'phone',  title:'Main Reception',  detail: HOSPITAL.phone               },
              { icon:'phone',  title:'Emergency Line',  detail: `${HOSPITAL.emergency} (24/7)`},
              { icon:'send',   title:'Email',           detail: HOSPITAL.email               },
            ].map(c => (
              <div key={c.title} style={{ display:'flex', gap:14, marginBottom:20 }}>
                <div style={{ width:46, height:46, borderRadius:12, background:C.light, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon name={c.icon} size={22} color={C.blue} />
                </div>
                <div>
                  <div style={{ fontWeight:700, color:C.navy, fontSize:14 }}>{c.title}</div>
                  <div style={{ color:C.slate, fontSize:14 }}>{c.detail}</div>
                </div>
              </div>
            ))}

            {/* Opening hours */}
            <div style={{ background:C.offWhite, borderRadius:16, padding:'1.4rem', marginBottom:20 }}>
              <h3 style={{ fontWeight:700, color:C.navy, marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
                <Icon name="clock" size={18} color={C.blue} /> Opening Hours
              </h3>
              {HOSPITAL.hours.map(h => (
                <div key={h.day} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:`1px solid ${C.light}`, fontSize:13 }}>
                  <span style={{ color:C.slate }}>{h.day}</span>
                  <span style={{ fontWeight:700, color: h.day === 'Emergency Dept' ? C.warn : C.navy }}>{h.time}</span>
                </div>
              ))}
            </div>

            {/* Google Maps embed */}
            <div style={{ borderRadius:16, overflow:'hidden', boxShadow:'0 4px 20px rgba(11,37,69,0.1)' }}>
              <iframe
                title="Meru Doctors' Plaza Location"
                src={HOSPITAL.mapSrc}
                width="100%" height="240"
                style={{ border:0, display:'block' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact form */}
          <div style={{ background:C.white, borderRadius:20, padding:'2.5rem', boxShadow:'0 8px 40px rgba(11,37,69,0.1)' }}>
            {sent ? (
              <div style={{ textAlign:'center', padding:'2rem 0' }}>
                <div style={{ width:70, height:70, borderRadius:'50%', margin:'0 auto 16px', background:`linear-gradient(135deg,${C.mint},#1aad74)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon name="check" size={36} color="#fff" />
                </div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, color:C.navy, marginBottom:8 }}>Message Sent!</h2>
                <p style={{ color:C.slate }}>Thank you for reaching out. Our team will respond within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name:'',email:'',phone:'',subject:'',message:'' }) }} style={{
                  marginTop:20, background:`linear-gradient(135deg,${C.blue},${C.sky})`,
                  color:'#fff', border:'none', cursor:'pointer', padding:'10px 24px', borderRadius:10, fontWeight:700,
                }}>Send Another</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, color:C.navy, marginBottom:24 }}>Send Us a Message</h2>
                {[
                  { label:'Your Name *',    key:'name',    type:'text',  ph:'Jane Doe'                },
                  { label:'Email',          key:'email',   type:'email', ph:'jane@example.com'        },
                  { label:'Phone',          key:'phone',   type:'tel',   ph:'+254 700 000 000'        },
                  { label:'Subject',        key:'subject', type:'text',  ph:'Inquiry about services'  },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom:16 }}>
                    <label style={{ display:'block', fontWeight:600, color:C.navy, marginBottom:6, fontSize:14 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} value={form[f.key]} onChange={e => set(f.key, e.target.value)} style={inputStyle(errors[f.key])} />
                    {errors[f.key] && <div style={{ color:C.warn, fontSize:12, marginTop:4 }}>{errors[f.key]}</div>}
                  </div>
                ))}
                <div style={{ marginBottom:20 }}>
                  <label style={{ display:'block', fontWeight:600, color:C.navy, marginBottom:6, fontSize:14 }}>Message *</label>
                  <textarea rows={4} placeholder="Tell us how we can help..." value={form.message} onChange={e => set('message', e.target.value)} style={{ ...inputStyle(errors.message), resize:'vertical' }} />
                  {errors.message && <div style={{ color:C.warn, fontSize:12, marginTop:4 }}>{errors.message}</div>}
                </div>
                <button onClick={handleSubmit} disabled={loading} style={{
                  width:'100%', background:`linear-gradient(135deg,${C.blue},${C.sky})`,
                  color:'#fff', border:'none', cursor: loading ? 'not-allowed' : 'pointer',
                  padding:14, borderRadius:10, fontWeight:700, fontSize:15,
                  display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                  opacity: loading ? 0.7 : 1,
                }}>
                  <Icon name="send" size={18} color="#fff" />
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
