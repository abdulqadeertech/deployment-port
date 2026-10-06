import { projects } from '../data'
import { useGsap, reveal, tilt, untilt } from '../hooks'
export default function Projects() {
  const ref = useGsap(reveal)
  return (
    <section id="projects" className="container sec" ref={ref}>
      <p className="mono eyebrow" data-r>02 / Work</p>
      <h2 data-r>Selected <span className="grad">projects</span></h2>
      <div className="grid3">{projects.map((p) => (
        <article className="card glow proj" data-r key={p.t} onMouseMove={tilt} onMouseLeave={untilt}>
          <h3>{p.t}</h3></article>))}</div>
    </section>)
}
