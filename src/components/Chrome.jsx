import { useEffect, useRef, useState } from 'react'
import { nav } from '../data'
import { gsap } from '../hooks'
export function Navbar() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    nav.forEach((id) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <nav className="nav" aria-label="Main"><a href="#top" className="logo mono">AQ</a>
      {nav.map((id) => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} aria-current={active === id ? 'true' : undefined}>{id}</a>)}
    </nav>)
}
export function Progress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const f = () => setP(window.scrollY / (document.documentElement.scrollHeight - innerHeight || 1))
    window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f)
  }, [])
  return <div className="progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />
}
export function Cursor() {
  const el = useRef(null)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const x = gsap.quickTo(el.current, 'x', { duration: 0.25 }), y = gsap.quickTo(el.current, 'y', { duration: 0.25 })
    const m = (e) => { x(e.clientX); y(e.clientY); el.current.style.opacity = 1 }
    window.addEventListener('mousemove', m); return () => window.removeEventListener('mousemove', m)
  }, [])
  return <div className="cursor" ref={el} aria-hidden="true" />
}
export const Footer = () => <footer className="footer container mono">© {new Date().getFullYear()} Abdul Qadeer · Balochistan, Pakistan</footer>
