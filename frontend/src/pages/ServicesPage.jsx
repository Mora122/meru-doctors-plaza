import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { C, INPATIENT_SERVICES, OUTPATIENT_SERVICES } from '../utils/constants'
import Icon from '../components/Icon'

const SERVICE_DETAILS = {
  maternity:   { desc: 'Comprehensive maternity care from antenatal to postnatal. Our skilled midwives and OB-GYN specialists ensure safe deliveries in a modern, well-equipped maternity wing.', features: ['Antenatal Clinics','Safe Delivery Unit','Postnatal Care','Kangaroo Mother Care','Family Planning','High-Risk Pregnancy Management'] },
  chemo:       { desc: 'Our oncology team delivers evidence-based chemotherapy treatment in a compassionate environment, with close monitoring and supportive care throughout every cycle.', features: ['IV Chemotherapy','Oral Chemotherapy','Pre-medication Protocols','Side Effect Management','Palliative Support','Oncology Nursing Care'] },
  cancer:      { desc: 'A dedicated centre for cancer diagnosis, staging, and treatment — bringing specialist oncology care to Meru County and the Mount Kenya region.', features: ['Cancer Screening','Tumour Staging','Biopsy Services','Chemotherapy','Palliative Care','Cancer Counselling'] },
  heart:       { desc: 'Specialised management of cardiac and metabolic conditions including heart disease, hypertension, and diabetes, supported by ECG and echo diagnostics.', features: ['ECG & Echocardiography','Hypertension Management','Diabetes Management','Cholesterol Screening','Cardiac Rehabilitation','Dietary Counselling'] },
  wards:       { desc: 'Comfortable general and private wards staffed around the clock. Private rooms are available for patients requiring additional privacy and comfort.', features: ['24/7 Nursing Care','Private & Semi-private Rooms','General Ward Beds','Specialist Ward Rounds','In-room Meals','Visiting Hours Support'] },
  icu:         { desc: 'A fully equipped Intensive Care Unit (ICU) and High Dependency Unit (HDU) for critically ill patients requiring continuous monitoring and advanced life support.', features: ['Mechanical Ventilation','Continuous Monitoring','Central Line Management','Vasopressor Support','Post-Surgical ICU Care','Step-Down HDU'] },
  dialysis:    { desc: 'Haemodialysis services for patients with chronic kidney disease and acute renal failure, delivered by trained nephrology technicians under specialist supervision.', features: ['Haemodialysis Sessions','Acute & Chronic Renal Failure','Fluid Management','AV Fistula Care','Dietitian Support','Home Dialysis Education'] },
  ctscan:      { desc: 'State-of-the-art CT scanning and digital X-ray providing fast, high-resolution imaging to support accurate diagnosis across all specialties.', features: ['64-Slice CT Scanner','Digital X-Ray','Contrast Studies','CT Angiography','Skeletal X-Ray','Chest & Abdominal CT'] },
  theatre:     { desc: 'Modern operating theatres equipped for elective and emergency surgical procedures, with trained anaesthesiology and theatre nursing teams.', features: ['General Surgery','Obstetric Surgery','Orthopaedic Procedures','ENT Surgery','Laparoscopic Surgery','Emergency Surgery'] },
  specialists: { desc: 'Visiting and resident specialist consultants across multiple disciplines, providing expert outpatient assessments and management plans.', features: ['OB-GYN','Paediatrics','Internal Medicine','Surgery','ENT','Dermatology','Orthopaedics','Urology'] },
  ambulance:   { desc: 'Fully equipped ambulance services for emergency transport and inter-facility transfers, staffed by trained paramedics and available 24/7.', features: ['24/7 Emergency Ambulance','Inter-facility Transfer','Basic Life Support','Advanced Life Support','Neonatal Transport','Oxygen & Defibrillator On Board'] },
  dental:      { desc: 'Comprehensive dental care from routine check-ups to complex oral surgery, including digital dental X-ray for precise diagnosis.', features: ['Digital Dental X-Ray','Tooth Extraction','Root Canal Treatment','Dental Fillings','Scaling & Polishing','Dental Implants','Orthodontics'] },
  physio:      { desc: 'Evidence-based physiotherapy and rehabilitation for musculoskeletal, neurological, and post-surgical conditions.', features: ['Sports Injury Rehab','Post-Surgical Rehab','Stroke Rehabilitation','Chronic Pain Management','TENS & Ultrasound Therapy','Exercise Programmes'] },
  counselling: { desc: 'Professional counselling to support patients and families through health challenges, grief, relationship difficulties, and life transitions.', features: ['Individual Counselling','Couples Counselling','Grief Counselling','Chronic Illness Support','Addiction Counselling','Crisis Intervention'] },
  psychology:  { desc: 'Clinical psychology services for assessment and management of mental health conditions, delivered by registered clinical psychologists.', features: ['Psychological Assessment','Cognitive Behavioural Therapy (CBT)','Depression & Anxiety','Trauma & PTSD','Child & Adolescent Psychology','Psychotherapy'] },
  gp:          { desc: 'General Practitioners available daily for routine consultations, minor illnesses, health screenings, and referrals to specialist services.', features: ['Routine Consultation','Minor Illness Treatment','Chronic Disease Follow-Up','Health Screening','Vaccinations','Referral Letters'] },
  optical:     { desc: 'Comprehensive eye care services including vision testing, prescription of corrective lenses, and management of common eye conditions.', features: ['Vision Testing','Prescription Glasses','Contact Lenses','Glaucoma Screening','Diabetic Eye Check','Referral to Ophthalmology'] },
  ctscanout:   { desc: 'Outpatient CT and X-ray imaging for rapid diagnostic support, with same-day results for most investigations.', features: ['Chest X-Ray','Abdominal CT','Head CT','Contrast Studies','Skeletal X-Ray','Sinuses & Facial Bones'] },
  ultrasound:  { desc: 'High-resolution diagnostic ultrasound covering obstetric, abdominal, musculoskeletal, and vascular applications.', features: ['Obstetric Ultrasound','Abdominal Ultrasound','4D Scans','Doppler Studies','Soft Tissue Ultrasound','Guided Procedures'] },
  pharmacy:    { desc: 'Fully stocked in-house pharmacy dispensing prescription and OTC medications, with clinical pharmacist counselling available.', features: ['Prescription Dispensing','OTC Medications','Chronic Disease Medications','Pediatric Formulations','IV Preparations','Medication Counselling'] },
  nutrition:   { desc: 'Registered dietitians provide personalised nutritional assessment and dietary counselling for a wide range of medical conditions.', features: ['Dietary Assessment','Diabetes Diet Plans','Renal Diet Counselling','Weight Management','Paediatric Nutrition','Oncology Nutrition'] },
  laboratory:  { desc: 'ISO-accredited laboratory offering comprehensive haematology, biochemistry, microbiology, and molecular diagnostic tests with rapid turnaround.', features: ['Full Blood Count','Blood Chemistry','HIV & TB Testing','Cancer Markers','Thyroid Function','Microbiology & Culture','PCR Testing'] },
  endoscopy:   { desc: 'Minimally invasive endoscopic procedures for diagnosis and treatment of gastrointestinal conditions, performed by trained gastroenterologists.', features: ['Upper GI Endoscopy','Colonoscopy','Biopsy','Polypectomy','H. Pylori Testing','Oesophageal Dilation'] },
  ecg:         { desc: 'Cardiac diagnostic services including 12-lead ECG and echocardiography for assessment of heart rhythm, structure, and function.', features: ['12-Lead ECG','2D Echocardiography','Doppler Echo','Holter Monitoring','Stress ECG','Cardiac Screening'] },
}

function SidebarBtn({ service, onClick, isActive }) {
  return (
    <button onClick={() => onClick(service.id)} style={{
      display:'flex', alignItems:'center', gap:10, width:'100%',
      background: isActive ? C.light : 'transparent',
      border: isActive ? `2px solid ${C.blue}` : '2px solid transparent',
      borderRadius:10, padding:'9px 12px', cursor:'pointer', marginBottom:3,
      textAlign:'left', transition:'all 0.2s',
    }}>
      <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, background:`${service.color}18`, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Icon name={service.icon} size={16} color={service.color} />
      </div>
      <span style={{ fontWeight: isActive ? 700 : 500, color: isActive ? C.blue : C.navy, fontSize:13, lineHeight:1.3 }}>
        {service.label}
      </span>
    </button>
  )
}

export default function ServicesPage() {
  const [activeId, setActiveId] = useState(INPATIENT_SERVICES[0].id)
  const navigate = useNavigate()

  const allServices = [...INPATIENT_SERVICES, ...OUTPATIENT_SERVICES]
  const activeService = allServices.find(s => s.id === activeId)
  const details = SERVICE_DETAILS[activeId] || { desc:'Specialist services delivered with care.', features:[] }
  const isInpatient = !!INPATIENT_SERVICES.find(s => s.id === activeId)

  return (
    <>
      <Helmet>
        <title>Our Services | Meru Doctors' Plaza Hospital</title>
        <meta name="description" content="Meru Doctors' Plaza offers inpatient services (maternity, ICU, chemotherapy, cancer centre, dialysis, theatre) and outpatient services (dental, pharmacy, laboratory, ultrasound, ECG, endoscopy, physio) in Meru County." />
      </Helmet>
      <div style={{ paddingTop:72 }}>

        {/* Hero */}
        <div style={{ background:`linear-gradient(135deg,${C.navy},#0D3272)`, padding:'4rem 2rem', textAlign:'center' }}>
          <div style={{ color:C.mint, fontWeight:700, fontSize:13, letterSpacing:2, textTransform:'uppercase', marginBottom:12 }}>What We Offer</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,5vw,3rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>
            Inpatient & Outpatient Services
          </h1>
          <p style={{ color:'rgba(255,255,255,0.72)', maxWidth:560, margin:'0 auto', lineHeight:1.7 }}>
            From critical inpatient care to specialist outpatient clinics — comprehensive healthcare under one roof.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', marginTop:28, flexWrap:'wrap' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(232,69,69,0.2)', border:'1px solid rgba(232,69,69,0.4)', borderRadius:100, padding:'8px 20px' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:C.warn }} />
              <span style={{ color:'#fff', fontWeight:600, fontSize:13 }}>9 Inpatient Services</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(19,99,223,0.2)', border:'1px solid rgba(19,99,223,0.4)', borderRadius:100, padding:'8px 20px' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:C.sky }} />
              <span style={{ color:'#fff', fontWeight:600, fontSize:13 }}>15 Outpatient Services</span>
            </div>
          </div>
        </div>

        {/* Service cards overview */}
        <div style={{ background:C.white, padding:'3rem 2rem' }}>
          <div style={{ maxWidth:1280, margin:'0 auto' }}>
            <div style={{ marginBottom:36 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:`linear-gradient(135deg,${C.warn},#c82020)`, color:'#fff', fontWeight:800, fontSize:12, letterSpacing:1.5, textTransform:'uppercase', padding:'7px 18px', borderRadius:100, marginBottom:18, boxShadow:`0 4px 14px rgba(232,69,69,0.3)` }}>
                🏥 Inpatient Services
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(170px,1fr))', gap:12 }}>
                {INPATIENT_SERVICES.map((s,i) => (
                  <div key={s.id} className="card-hover" onClick={() => setActiveId(s.id)} style={{ background: activeId===s.id ? C.light : C.offWhite, border:`2px solid ${activeId===s.id ? C.blue : 'transparent'}`, borderRadius:14, padding:'1.1rem', cursor:'pointer', animation:`fadeUp 0.4s ease ${i*0.04}s both`, borderLeft:`4px solid ${s.color}` }}>
                    <div style={{ width:38, height:38, borderRadius:9, background:`${s.color}18`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:8 }}>
                      <Icon name={s.icon} size={18} color={s.color} />
                    </div>
                    <div style={{ fontWeight:700, fontSize:12, color:C.navy, lineHeight:1.35 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:'#fff', fontWeight:800, fontSize:12, letterSpacing:1.5, textTransform:'uppercase', padding:'7px 18px', borderRadius:100, marginBottom:18, boxShadow:`0 4px 14px rgba(19,99,223,0.3)` }}>
                🩺 Outpatient Services
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(170px,1fr))', gap:12 }}>
                {OUTPATIENT_SERVICES.map((s,i) => (
                  <div key={s.id} className="card-hover" onClick={() => setActiveId(s.id)} style={{ background: activeId===s.id ? C.light : C.offWhite, border:`2px solid ${activeId===s.id ? C.blue : 'transparent'}`, borderRadius:14, padding:'1.1rem', cursor:'pointer', animation:`fadeUp 0.4s ease ${i*0.04}s both`, borderLeft:`4px solid ${s.color}` }}>
                    <div style={{ width:38, height:38, borderRadius:9, background:`${s.color}18`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:8 }}>
                      <Icon name={s.icon} size={18} color={s.color} />
                    </div>
                    <div style={{ fontWeight:700, fontSize:12, color:C.navy, lineHeight:1.35 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detail panel with sidebar */}
        <div style={{ background:C.offWhite, padding:'3rem 2rem' }}>
          <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'minmax(220px,260px) 1fr', gap:28 }}>

            {/* Sidebar nav */}
            <nav aria-label="Service navigation">
              <div style={{ fontWeight:800, color:C.navy, fontSize:11, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8, paddingLeft:4 }}>🏥 Inpatient</div>
              {INPATIENT_SERVICES.map(s => <SidebarBtn key={s.id} service={s} onClick={setActiveId} isActive={activeId===s.id} />)}
              <div style={{ fontWeight:800, color:C.navy, fontSize:11, letterSpacing:1.5, textTransform:'uppercase', margin:'18px 0 8px', paddingLeft:4 }}>🩺 Outpatient</div>
              {OUTPATIENT_SERVICES.map(s => <SidebarBtn key={s.id} service={s} onClick={setActiveId} isActive={activeId===s.id} />)}
            </nav>

            {/* Detail */}
            {activeService && (
              <div key={activeId} className="fade-up">
                <div style={{ background:`linear-gradient(135deg,${activeService.color},${activeService.color}BB)`, borderRadius:20, padding:'2.5rem', marginBottom:20 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:14 }}>
                    <div style={{ width:54, height:54, borderRadius:14, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Icon name={activeService.icon} size={28} color="#fff" />
                    </div>
                    <div>
                      <div style={{ color:'rgba(255,255,255,0.7)', fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:'uppercase', marginBottom:3 }}>
                        {isInpatient ? '🏥 Inpatient Service' : '🩺 Outpatient Service'}
                      </div>
                      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.7rem', fontWeight:800, color:'#fff' }}>{activeService.label}</h2>
                    </div>
                  </div>
                  <p style={{ color:'rgba(255,255,255,0.88)', lineHeight:1.75, fontSize:15 }}>{details.desc}</p>
                </div>

                {details.features.length > 0 && (
                  <div style={{ background:C.white, borderRadius:16, padding:'1.8rem', marginBottom:20, boxShadow:'0 4px 20px rgba(11,37,69,0.07)' }}>
                    <h3 style={{ fontWeight:800, color:C.navy, marginBottom:16, fontSize:15 }}>What We Provide</h3>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:10 }}>
                      {details.features.map(f => (
                        <div key={f} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', background:C.offWhite, borderRadius:10 }}>
                          <div style={{ width:8, height:8, borderRadius:'50%', background:activeService.color, flexShrink:0 }} />
                          <span style={{ color:C.navy, fontSize:13, fontWeight:500 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                  <button onClick={() => navigate('/appointments')} style={{ background:`linear-gradient(135deg,${C.blue},${C.sky})`, color:'#fff', border:'none', cursor:'pointer', padding:'12px 26px', borderRadius:10, fontWeight:700, fontSize:14, display:'flex', alignItems:'center', gap:8 }}>
                    <Icon name="calendar" size={16} color="#fff" /> Book Appointment
                  </button>
                  <button onClick={() => navigate('/doctors')} style={{ background:'none', border:`2px solid ${C.blue}`, color:C.blue, cursor:'pointer', padding:'12px 26px', borderRadius:10, fontWeight:700, fontSize:14 }}>
                    Find a Specialist
                  </button>
                  <a href="tel:+254700000911" style={{ background:'none', border:`2px solid ${C.warn}`, color:C.warn, padding:'12px 26px', borderRadius:10, fontWeight:700, fontSize:14, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:6 }}>
                    🚨 Emergency
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
