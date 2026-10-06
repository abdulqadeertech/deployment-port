import { journey } from '../data'
import { useGsap, reveal, gsap } from '../hooks'
export default function Journey() {
  const ref = useGsap((el) => {
    reveal(el)
    gsap.fromTo('.line-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top',
      scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 70%', scrub: true } })
  })
  return (
    <section id="journey" className="container sec" ref={ref}>
      <p className="mono eyebrow" data-r>03 / Background</p>
      <h2 data-r>Education &amp; <span className="grad">experience</span></h2>
      <ol className="timeline"><span className="line"><span className="line-fill" /></span>
        {journey.map((j) => <li data-r key={j.t}><span className="mono">{j.y}</span><h3>{j.t}</h3><p>{j.d}</p></li>)}</ol>
    </section>)
}
