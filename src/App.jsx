import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Contact from './components/Contact'
import { Navbar, Progress, Cursor, Footer } from './components/Chrome'
export default function App() {
  return (<><a className="skip" href="#about">Skip to content</a><Progress /><Cursor /><Navbar />
    <main><Hero /><Marquee /><About /><Projects /><Journey /><Contact /></main><Footer /></>)
}
