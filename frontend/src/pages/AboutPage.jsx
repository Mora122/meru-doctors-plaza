import { Helmet } from 'react-helmet-async'
import { C } from '../utils/constants'
import Icon from '../components/Icon'

const TEAM = [
  { name:'Dr. Samuel Mutua',   role:'Medical Director',       spec:'General & Internal Medicine', exp:'18 yrs' },
  { name:'Dr. Grace Njiru',    role:'Chief of Obstetrics',    spec:'OB-GYN & Maternal Health',    exp:'15 yrs' },
  { name:'Dr. Peter Kirimi',   role:'Head of Radiology',      spec:'Diagnostic Imaging',          exp:'12 yrs' },
  { name:'Dr. Esther Nkatha',  role:'Pediatrics Specialist',  spec:'Child Healthcare',            exp:'10 yrs' },
  { name:'Dr. Moses Gitonga',  role:'ENT Specialist',         spec:'Ear, Nose & Throat',          exp:'14 yrs' },
  { name:'Dr. Priscilla Mwai', role:'Dental Surgeon',         spec:'Restorative & Oral Surgery',  exp:'9 yrs'  },
]

const TIMELINE = [
  { year:'2010', event:'Hospital founded with 30 beds and 8 physicians' },
  { year:'2013', event:'Radiology department opened with first ultrasound unit' },
  { year:'2016', event:'ISO 9001:2015 accreditation achieved' },
  { year:'2019', event:'Expanded to 120 beds and 10 specialist departments' },
  { year:'2022', event:'Telemedicine platform launched for remote consultations' },
  { year:'2024', event:'CT Scanner and advanced laboratory equipment installed' },
]

const ACCREDITATIONS = [
  'KMPDC Licensed','ISO 9001:2015','NHIF Accredited',
  'Kenya Medical Standards','WHO Guidelines Compliant','SafeCare Certified',
]

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Meru Doctors' Plaza Hospital</title>
        <meta name="description" content="Learn about Meru Doctors' Plaza Hospital — our history, mission, vision, leadership team, and accreditations serving Meru County since 2010." />
      </Helmet>

      <div style={{paddingTop:72}}>
        {/* Hero */}
        <div style={{background:`linear-gradient(135deg,${C.navy},#0D3272)`,padding:'5rem 2rem',textAlign:'center'}}>
          <div style={{color:C.mint,fontWeight:700,fontSize:13,letterSpacing:2,textTransform:'uppercase',marginBottom:12}}>About Us</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,5vw,3.2rem)',fontWeight:800,color:'#fff',marginBottom:16}}>
            Healing with Purpose, Leading with Care
          </h1>
          <p style={{color:'rgba(255,255,255,0.72)',maxWidth:600,margin:'0 auto',lineHeight:1.7,fontSize:16}}>
            Since 2010, Meru Doctors' Plaza has been the healthcare anchor of Meru County,
            offering advanced Level 4 services to over 12,000 patients annually.
          </p>
        </div>

        {/* Story + Timeline */}
        <div style={{background:C.white,padding:'5rem 2rem'}}>
          <div style={{maxWidth:1000,margin:'0 auto'}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'2rem',fontWeight:800,color:C.navy,marginBottom:20}}>Our Story</h2>
            <p style={{color:C.slate,lineHeight:1.8,marginBottom:16}}>
              Meru Doctors' Plaza was established by a group of dedicated physicians who recognised the critical gap
              in specialist healthcare services across Meru County. Starting as a 30-bed facility with just 8 doctors,
              we have grown into a 120-bed Level 4 hospital with 45+ specialist consultants across 10 clinical departments.
            </p>
            <p style={{color:C.slate,lineHeight:1.8,marginBottom:40}}>
              Our growth has been guided by one core principle: every patient deserves the same quality of care
              regardless of their background. This commitment has earned us numerous national accreditations and
              recognition as a centre of clinical excellence in the Mount Kenya region.
            </p>
            {TIMELINE.map((item,i) => (
              <div key={item.year} style={{display:'flex',gap:20,marginBottom:20}}>
                <div style={{
                  minWidth:60,height:60,borderRadius:'50%',
                  background:`linear-gradient(135deg,${C.blue},${C.sky})`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  color:'#fff',fontWeight:800,fontSize:12,textAlign:'center',lineHeight:1.2,flexShrink:0,
                }}>{item.year}</div>
                <div style={{
                  flex:1,background:C.offWhite,borderRadius:12,
                  padding:'14px 20px',display:'flex',alignItems:'center',
                  borderLeft:`3px solid ${C.sky}`,
                }}>
                  <span style={{color:C.navy,fontWeight:500}}>{item.event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission/Vision/Values */}
        <div style={{background:C.offWhite,padding:'4rem 2rem'}}>
          <div style={{maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:24}}>
            {[
              {title:'Our Mission',icon:'heart',  color:C.blue,   text:'To deliver compassionate, affordable, and evidence-based healthcare to every patient, regardless of their socio-economic background.'},
              {title:'Our Vision', icon:'zap',    color:C.mint,   text:"To be East Africa's most trusted Level 4 community hospital, setting the gold standard for accessible specialist care by 2030."},
              {title:'Our Values', icon:'shield', color:'#7C3AED',text:'Compassion, Integrity, Excellence, Accessibility, Innovation, and Continuous Learning guide every clinical and administrative decision we make.'},
            ].map(m => (
              <div key={m.title} style={{background:C.white,borderRadius:20,padding:'2rem',boxShadow:'0 4px 20px rgba(11,37,69,0.08)',borderTop:`4px solid ${m.color}`}}>
                <Icon name={m.icon} size={36} color={m.color} />
                <h3 style={{fontFamily:"'Playfair Display',serif",fontWeight:800,color:C.navy,margin:'16px 0 10px'}}>{m.title}</h3>
                <p style={{color:C.slate,lineHeight:1.7}}>{m.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div style={{background:C.white,padding:'5rem 2rem'}}>
          <div style={{maxWidth:1280,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:'3rem'}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'2.2rem',fontWeight:800,color:C.navy}}>Our Leadership Team</h2>
              <p style={{color:C.slate,marginTop:8}}>Experienced specialists dedicated to advancing healthcare in Meru County</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:24}}>
              {TEAM.map(d => (
                <div key={d.name} className="card-hover" style={{background:C.offWhite,borderRadius:20,padding:'2rem',textAlign:'center',boxShadow:'0 4px 20px rgba(11,37,69,0.06)'}}>
                  <div style={{width:80,height:80,borderRadius:'50%',margin:'0 auto 16px',background:`linear-gradient(135deg,${C.blue},${C.mint})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:800,color:'#fff'}}>
                    {d.name.split(' ')[1][0]}
                  </div>
                  <div style={{fontWeight:800,color:C.navy,fontSize:16}}>{d.name}</div>
                  <div style={{color:C.blue,fontWeight:600,fontSize:13,margin:'4px 0'}}>{d.role}</div>
                  <div style={{color:C.slate,fontSize:12,marginBottom:8}}>{d.spec}</div>
                  <div style={{display:'inline-block',background:C.light,color:C.blue,fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:100}}>{d.exp} experience</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accreditations */}
        <div style={{background:`linear-gradient(135deg,${C.navy},#0D3272)`,padding:'4rem 2rem'}}>
          <div style={{maxWidth:1000,margin:'0 auto',textAlign:'center'}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'2rem',fontWeight:800,color:'#fff',marginBottom:32}}>Accreditations & Certifications</h2>
            <div style={{display:'flex',gap:20,flexWrap:'wrap',justifyContent:'center'}}>
              {ACCREDITATIONS.map(a => (
                <div key={a} style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:10,padding:'10px 20px',display:'flex',alignItems:'center',gap:8}}>
                  <Icon name="check" size={16} color={C.mint} />
                  <span style={{color:'#fff',fontWeight:600,fontSize:13}}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
