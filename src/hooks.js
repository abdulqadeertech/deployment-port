import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
// Scoped GSAP context: all tweens/triggers are reverted on unmount.
export function useGsap(fn) {
  const ref = useRef(null)
  useEffect(() => {
    if (reduced()) return
    const ctx = gsap.context(() => fn(ref.current), ref)
    return () => ctx.revert()
  }, [])
  return ref
}
export const reveal = (el) => {
  gsap.from(el.querySelectorAll('[data-r]'), { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
    scrollTrigger: { trigger: el, start: 'top 80%' } })
}
export function tilt(e) {
  if (reduced()) return
  const r = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
  gsap.to(e.currentTarget, { rotationY: x * 12, rotationX: -y * 12, transformPerspective: 800, duration: 0.4 })
}
export const untilt = (e) => !reduced() && gsap.to(e.currentTarget, { rotationX: 0, rotationY: 0, duration: 0.6 })
export { gsap, ScrollTrigger }
