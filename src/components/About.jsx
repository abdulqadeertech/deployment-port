import { tech, languages } from '../data'
import { useGsap, reveal } from '../hooks'
export default function About() {
  const ref = useGsap(reveal)
  return (
    <section id="about" className="container sec" ref={ref}>
      <p className="mono eyebrow" data-r>01 / About</p>
      <h2 data-r>Learning to build <span className="grad">clean websites</span></h2>
      <p className="lead" data-r>I am a beginner web developer passionate about learning modern web technologies and creating clean, user-friendly websites.</p>
      <div className="grid3">
        <div className="card" data-r><h3>Skills</h3><ul className="tags mono">{tech.map((t) => <li key={t}>{t}</li>)}</ul></div>
        <div className="card" data-r><h3>Languages</h3><ul className="tags mono">{languages.map((t) => <li key={t}>{t}</li>)}</ul></div>
        <div className="card" data-r><h3>Location</h3><p>Balochistan, Pakistan</p></div>
      </div>
    </section>)
}
