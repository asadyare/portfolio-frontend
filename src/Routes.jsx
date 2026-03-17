import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'


export default function RoutesApp() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-100 font-sans transition-colors duration-300">
        <Navbar />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Navigate to="/#projects" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            <Route path="/about" element={<Navigate to="/#skills" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}