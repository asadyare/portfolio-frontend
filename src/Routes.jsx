import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './components/projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import About from './components/About'


export default function RoutesApp() {
return (
<Router>
<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-100 font-sans transition-colors duration-300">
<Navbar />
<main className="max-w-6xl mx-auto px-6">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/projects" element={<Projects />} />
<Route path="/contact" element={<Contact />} />
<Route path="/about" element={<About />} />
</Routes>
</main>
<Footer />
</div>
</Router>
)
}