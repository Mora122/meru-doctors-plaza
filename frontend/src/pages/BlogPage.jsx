import { Helmet } from 'react-helmet-async'
import { C } from '../utils/constants'
import Icon from '../components/Icon'

const ARTICLES = [
  { tag:'Maternal Health',    title:'Understanding Antenatal Care: A Complete Guide for First-Time Mothers',   date:'Feb 28, 2025', author:'Dr. Grace Njiru',     read:'5 min', icon:'baby'     },
  { tag:'Pediatrics',         title:'Childhood Vaccination Schedule: What Every Parent Should Know',          date:'Feb 15, 2025', author:'Dr. Esther Nkatha',   read:'4 min', icon:'heart'    },
  { tag:'Nutrition',          title:'Managing Diabetes Through Diet: Expert Advice from Our Specialists',    date:'Feb 5, 2025',  author:'Dr. Samuel Mutua',    read:'6 min', icon:'activity' },
  { tag:'Medication Safety',  title:'How to Take Your Medications Safely: A Patient\'s Guide',               date:'Jan 28, 2025', author:'Pharm. Ruth Murungi', read:'3 min', icon:'pill'     },
  { tag:'Disease Prevention', title:'Malaria Prevention in Meru County: Symptoms, Treatment & Home Safety', date:'Jan 20, 2025', author:'Dr. Samuel Mutua',    read:'5 min', icon:'shield'   },
  { tag:'Dental Health',      title:'Five Habits That Are Silently Damaging Your Teeth',                    date:'Jan 10, 2025', author:'Dr. Priscilla Mwai',  read:'4 min', icon:'tooth'    },
]

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Health Education Blog | Meru Doctors' Plaza Hospital</title>
        <meta name="description" content="Medical articles and health tips from Meru Doctors' Plaza specialists — covering maternal health, pediatrics, disease prevention, dental care and more." />
      </Helmet>
      <div style={{paddingTop:72}}>
        <div style={{background:`linear-gradient(135deg,${C.navy},#0D3272)`,padding:'4rem 2rem',textAlign:'center'}}>
          <div style={{color:C.mint,fontWeight:700,fontSize:13,letterSpacing:2,textTransform:'uppercase',marginBottom:12}}>Health Education</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,5vw,3rem)',fontWeight:800,color:'#fff'}}>Medical Articles & Health Tips</h1>
          <p style={{color:'rgba(255,255,255,0.7)',marginTop:8,fontSize:16}}>Expert health advice from our specialist doctors</p>
        </div>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'4rem 2rem',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:28}}>
          {ARTICLES.map(a => (
            <article key={a.title} className="card-hover" style={{background:C.white,borderRadius:20,overflow:'hidden',cursor:'pointer',boxShadow:'0 4px 20px rgba(11,37,69,0.07)'}}>
              <div style={{height:180,background:`linear-gradient(135deg,${C.navy},#0D3272)`,display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                <Icon name={a.icon} size={70} color="rgba(255,255,255,0.12)" />
                <div style={{position:'absolute',top:16,left:16,background:'rgba(19,99,223,0.85)',backdropFilter:'blur(8px)',color:'#fff',fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:100}}>{a.tag}</div>
              </div>
              <div style={{padding:'1.6rem'}}>
                <h2 style={{fontWeight:700,color:C.navy,fontSize:15,lineHeight:1.45,marginBottom:12}}>{a.title}</h2>
                <div style={{display:'flex',gap:16,color:C.slate,fontSize:12}}>
                  <span style={{display:'flex',alignItems:'center',gap:4}}><Icon name="user" size={12} color={C.slate} />{a.author}</span>
                  <span style={{display:'flex',alignItems:'center',gap:4}}><Icon name="clock" size={12} color={C.slate} />{a.read} read</span>
                </div>
                <div style={{color:C.slate,fontSize:12,marginTop:6}}>{a.date}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
