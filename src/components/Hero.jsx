import { useEffect, useState } from 'react'
import { roles } from '../data'
import { useGsap, gsap } from '../hooks'
function Typing() {
  const [i, setI] = useState(0), [t, setT] = useState(''), [del, setDel] = useState(false)
  useEffect(() => {
    const w = roles[i]
    const id = setTimeout(() => {
      if (!del) { setT(w.slice(0, t.length + 1)); if (t.length + 1 === w.length) setTimeout(() => setDel(true), 1200) }
      else { setT(w.slice(0, t.length - 1)); if (t.length <= 1) { setDel(false); setI((i + 1) % roles.length) } }
    }, del ? 35 : 70)
    return () => clearTimeout(id)
  }, [t, del, i])
  return <p className="mono typing" aria-label={roles.join(', ')}><span aria-hidden="true">{t}<i className="caret" /></span></p>
}
export default function Hero() {
  const ref = useGsap((el) => {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.h-in', { y: 50, opacity: 0, duration: 0.9, stagger: 0.12 })
      .from('.art', { scale: 0.85, opacity: 0, duration: 1 }, 0.2)
    gsap.to('.art', { y: -14, repeat: -1, yoyo: true, duration: 2.4, ease: 'sine.inOut' })
    gsap.to('.hero-copy', { yPercent: 15, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } })
  })
  return (
    <section id="top" className="hero container" ref={ref}>
      <div className="hero-copy">
        <p className="mono h-in eyebrow">Hello, I'm</p>
        <h1 className="h-in">Abdul <span className="grad">Qadeer</span></h1>
        <div className="h-in"><Typing /></div>
        <p className="h-in lead">Beginner web developer creating clean, user-friendly websites with HTML and CSS.</p>
        <div className="h-in row"><a className="btn primary" href="#projects">View My Work</a><a className="btn" href="#contact">Hire Me</a></div>
      </div>
      <div className="art" role="img" aria-label="Illustration of a laptop showing code">
        <img src="/images/hero.png" alt="" onError={(e) => (e.currentTarget.style.display = 'none')} loading="eager" />
        <svg viewBox="0 0 320 240" className="laptop" aria-hidden="true">
          <rect x="50" y="20" width="220" height="150" rx="12" fill="#23244d" /><rect x="60" y="30" width="200" height="130" rx="6" fill="#C0C9EE" />
          <rect x="72" y="46" width="90" height="8" rx="4" fill="#898AC4" /><rect x="84" y="64" width="120" height="8" rx="4" fill="#23244d" />
          <rect x="84" y="82" width="70" height="8" rx="4" fill="#A2AADB" /><rect x="72" y="100" width="140" height="8" rx="4" fill="#898AC4" />
          <rect x="84" y="118" width="100" height="8" rx="4" fill="#23244d" />
          <path d="M20 190h280l-24 26H44z" fill="#898AC4" />
        </svg>
      </div>
    </section>)
}
