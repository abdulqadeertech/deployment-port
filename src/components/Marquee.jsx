import { useEffect, useRef } from 'react'
import { tech } from '../data'
import { gsap, ScrollTrigger, reduced } from '../hooks'
export default function Marquee() {
  const track = useRef(null)
  useEffect(() => {
    if (reduced()) return
    const tw = gsap.to(track.current, { xPercent: -50, repeat: -1, duration: 28, ease: 'none' })
    const st = ScrollTrigger.create({ onUpdate: (s) => {
      const v = Math.min(Math.abs(s.getVelocity()) / 300, 6)
      gsap.to(tw, { timeScale: 1 + v, duration: 0.2, overwrite: true, onComplete: () => gsap.to(tw, { timeScale: 1, duration: 1 }) })
    } })
    return () => { st.kill(); tw.kill() }
  }, [])
  const items = [...tech, ...tech]
  return (
    <div className="marquee" aria-label="Technologies"><div className="track mono" ref={track}>
      {items.map((t, i) => <span key={i} aria-hidden={i >= tech.length}>{t}<b> ✦ </b></span>)}
    </div></div>)
}
