import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'

const DashboardLive = lazy(() => import('./pages/DashboardLive'))
const ProjectsIndex = lazy(() => import('./pages/ProjectsIndex'))
const ProjectCategoryIndex = lazy(() => import('./pages/ProjectCategoryIndex'))
const ProjectCaseStudy = lazy(() => import('./pages/ProjectCaseStudy'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteFallback() {
  return <div className="min-h-[40vh]" aria-hidden="true" />
}

export default function RoutesApp() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-body antialiased">
        <Navbar />
        <main className="w-full">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<DashboardLive />} />
              <Route path="/projects" element={<ProjectsIndex />} />
              <Route path="/projects/:categoryId/:slug" element={<ProjectCaseStudy />} />
              <Route path="/projects/:categoryId" element={<ProjectCategoryIndex />} />
              <Route path="/contact" element={<Navigate to="/#contact" replace />} />
              <Route path="/about" element={<Navigate to="/#skills" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
