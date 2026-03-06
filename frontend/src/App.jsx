import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import Nav    from './components/Nav'
import Footer from './components/Footer'
import { C }  from './utils/constants'

// ── Lazy-load pages for code splitting ────────────────────────────
const HomePage          = lazy(() => import('./pages/HomePage'))
const AboutPage         = lazy(() => import('./pages/AboutPage'))
const ServicesPage      = lazy(() => import('./pages/ServicesPage'))
const DoctorsPage       = lazy(() => import('./pages/DoctorsPage'))
const AppointmentsPage  = lazy(() => import('./pages/AppointmentsPage'))
const PatientPortalPage = lazy(() => import('./pages/PatientPortalPage'))
const BlogPage          = lazy(() => import('./pages/BlogPage'))
const ContactPage       = lazy(() => import('./pages/ContactPage'))
const NotFoundPage      = lazy(() => import('./pages/NotFoundPage'))

// ── Loading fallback ──────────────────────────────────────────────
function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: C.offWhite,
    }}>
      <div style={{
        width: 48, height: 48, border: `4px solid ${C.light}`,
        borderTopColor: C.blue, borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  )
}

// ── Scroll to top on navigation ───────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      {/* Accessibility skip link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Nav />

      <main id="main-content">
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"             element={<HomePage />}          />
            <Route path="/about"        element={<AboutPage />}         />
            <Route path="/services"     element={<ServicesPage />}      />
            <Route path="/doctors"      element={<DoctorsPage />}       />
            <Route path="/appointments" element={<AppointmentsPage />}  />
            <Route path="/portal"       element={<PatientPortalPage />} />
            <Route path="/blog"         element={<BlogPage />}          />
            <Route path="/contact"      element={<ContactPage />}       />
            <Route path="*"             element={<NotFoundPage />}      />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  )
}
