// ── Design tokens ─────────────────────────────────────────────────
export const C = {
  navy:      '#0B2545',
  blue:      '#1363DF',
  sky:       '#3B9EED',
  mint:      '#2ECC8A',
  softGreen: '#E8F8F1',
  offWhite:  '#F4F8FF',
  slate:     '#5A6E8C',
  light:     '#EAF1FB',
  white:     '#FFFFFF',
  warn:      '#E84545',
}

// ── Hospital info (mirrors .env for non-secret values) ─────────────
export const HOSPITAL = {
  name:       "Meru Doctors' Plaza Hospital",
  tagline:    'Level 4 Hospital',
  phone:      '+254 700 000 100',
  emergency:  '+254 700 000 911',
  email:      'info@merudoctorsplaza.co.ke',
  address:    'Njuri-Ncheke Street, Meru Town, Meru County',
  mapSrc:     'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.27!2d37.6490!3d0.0469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMeru+Town!5e0!3m2!1sen!2ske!4v1700000000000',
  social: {
    facebook:  'https://facebook.com/merudoctorsplaza',
    twitter:   'https://twitter.com/merudoctorsplaza',
    instagram: 'https://instagram.com/merudoctorsplaza',
  },
  hours: [
    { day: 'Monday – Friday',  time: '7:00 AM – 8:00 PM' },
    { day: 'Saturday',         time: '8:00 AM – 5:00 PM' },
    { day: 'Sunday',           time: '9:00 AM – 3:00 PM' },
    { day: 'Emergency Dept',   time: '24 Hours, 7 Days'  },
  ],
}

// ── Inpatient Services (from hospital signboard) ──────────────────
export const INPATIENT_SERVICES = [
  { id: 'maternity',    label: 'Maternity',                  icon: 'baby',        color: '#E91E8C' },
  { id: 'chemo',        label: 'Chemotherapy',               icon: 'activity',    color: '#DC2626' },
  { id: 'cancer',       label: 'Cancer Centre',              icon: 'shield',      color: '#7C3AED' },
  { id: 'heart',        label: 'Heart & Diabetes Centre',    icon: 'heart',       color: '#E84545' },
  { id: 'wards',        label: 'General & Private Wards',    icon: 'user',        color: '#0EA5E9' },
  { id: 'icu',          label: 'ICU / HDU',                  icon: 'zap',         color: '#F59E0B' },
  { id: 'dialysis',     label: 'Dialysis',                   icon: 'activity',    color: '#1363DF' },
  { id: 'ctscan',       label: 'CT Scan / X-Ray',            icon: 'activity',    color: '#3B9EED' },
  { id: 'theatre',      label: 'Theatre Services',           icon: 'scissors',    color: '#16A34A' },
]

// ── Outpatient Services (from hospital signboard) ─────────────────
export const OUTPATIENT_SERVICES = [
  { id: 'specialists',  label: 'Specialists Clinics',        icon: 'stethoscope', color: '#1363DF' },
  { id: 'ambulance',    label: 'Ambulance Services',         icon: 'ambulance',   color: '#E84545' },
  { id: 'dental',       label: 'Dental & Dental X-Ray',      icon: 'tooth',       color: '#0EA5E9' },
  { id: 'physio',       label: 'Physiotherapy',              icon: 'bone',        color: '#16A34A' },
  { id: 'counselling',  label: 'Counselling',                icon: 'chat',        color: '#7C3AED' },
  { id: 'psychology',   label: 'Psychology',                 icon: 'user',        color: '#E91E8C' },
  { id: 'gp',           label: 'General Practitioners',      icon: 'user',        color: '#B45309' },
  { id: 'optical',      label: 'Optical Services',           icon: 'eye',         color: '#3B9EED' },
  { id: 'ctscanout',    label: 'CT Scan / X-Ray',            icon: 'activity',    color: '#1363DF' },
  { id: 'ultrasound',   label: 'Ultrasound',                 icon: 'activity',    color: '#2ECC8A' },
  { id: 'pharmacy',     label: 'Pharmacy',                   icon: 'pill',        color: '#2ECC8A' },
  { id: 'nutrition',    label: 'Nutrition',                  icon: 'heart',       color: '#F59E0B' },
  { id: 'laboratory',   label: 'Laboratory',                 icon: 'microscope',  color: '#7C3AED' },
  { id: 'endoscopy',    label: 'Endoscopy',                  icon: 'activity',    color: '#0EA5E9' },
  { id: 'ecg',          label: 'ECG & Echo',                 icon: 'activity',    color: '#DC2626' },
]

// ── All departments (for appointment booking dropdown) ─────────────
export const DEPARTMENTS = [
  ...INPATIENT_SERVICES.map(s => ({ ...s })),
  ...OUTPATIENT_SERVICES.map(s => ({ ...s })),
].filter((s, i, arr) => arr.findIndex(x => x.label === s.label) === i) // deduplicate

// ── Insurance Partners (from hospital signboard) ──────────────────
export const INSURERS = [
  'CIC Group',
  'SHA (Social Health Authority)',
  'Sedgwick',
  'Kenyan Alliance',
  'AAR Insurance',
  'UAP Insurance',
  'Equity Insurance',
  'Sanlam',
  'Madison Insurance',
  'GA Insurance',
  'Britam',
  'Kenbright',
  'KCL Insurance',
  'Liaison',
  'Jubilee Insurance',
  'KenGen',
  'Minet',
  'APA Insurance',
  'MTN',
  'Pacis Insurance',
  'MUA Insurance',
  'Heritage Insurance',
  'M-Tiba',
]

// ── API base URL ──────────────────────────────────────────────────
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
