import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import DashboardLive from './pages/DashboardLive'
import ProjectsIndex from './pages/ProjectsIndex'
import ProjectCategoryIndex from './pages/ProjectCategoryIndex'
import ProjectCaseStudy from './pages/ProjectCaseStudy'
import Footer from './components/Footer'

export default function RoutesApp() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-body antialiased">
        <Navbar />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashboardLive />} />
            <Route path="/projects" element={<ProjectsIndex />} />
            <Route path="/projects/:categoryId/:slug" element={<ProjectCaseStudy />} />
            <Route path="/projects/:categoryId" element={<ProjectCategoryIndex />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            <Route path="/about" element={<Navigate to="/#skills" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}