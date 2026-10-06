import { useState } from 'react'
import { WEB3FORMS_KEY, EMAIL, WHATSAPP, PHONE, LOCATION } from '../config'
import { useGsap, reveal } from '../hooks'
export default function Contact() {
  const ref = useGsap(reveal)
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [err, setErr] = useState({}), [status, setStatus] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const validate = () => {
    const e = {}
    if (f.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Please enter a valid email.'
    if (f.message.trim().length < 10) e.message = 'Message should be at least 10 characters.'
    setErr(e); return !Object.keys(e).length
  }
  const submit = async (ev) => {
    ev.preventDefault(); if (!validate()) return
    if (!WEB3FORMS_KEY) {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio message from ' + f.name)}&body=${encodeURIComponent(f.message + '\n\n' + f.name + ' (' + f.email + ')')}`
      return setStatus('Opening your email app…')
    }
    setStatus('Sending…')
    try {
      const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...f }) })
      const d = await r.json()
      if (d.success) { setStatus('Thanks! Your message was sent.'); setF({ name: '', email: '', message: '' }) } else throw new Error()
    } catch { setStatus('Something went wrong. Please try WhatsApp or email directly.') }
  }
  const wa = () => validate() && window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi Abdul, I'm ${f.name}. ${f.message}`)}`, '_blank', 'noopener')
  const field = (k, label, extra) => (
    <label>{label}{extra ? <textarea rows="5" value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={`${k}-e`} />
      : <input type={k === 'email' ? 'email' : 'text'} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={`${k}-e`} />}
      <small id={`${k}-e`} className="err">{err[k]}</small></label>)
  return (
    <section id="contact" className="container sec" ref={ref}>
      <p className="mono eyebrow" data-r>04 / Contact</p>
      <h2 data-r>Let's <span className="grad">work together</span></h2>
      <div className="contact">
        <form className="card" data-r onSubmit={submit} noValidate>
          {field('name', 'Name')}{field('email', 'Email')}{field('message', 'Message', true)}
          <div className="row"><button className="btn primary" type="submit">Send Message</button><button className="btn" type="button" onClick={wa}>Send on WhatsApp</button></div>
          <p role="status" aria-live="polite" className="status">{status}</p>
        </form>
        <div className="card" data-r>
          <h3>Get in touch</h3>
          <ul className="clist">
            <li><span className="mono">Email</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><span className="mono">WhatsApp</span><a href={`https://wa.me/${WHATSAPP}`}>{PHONE}</a></li>
            <li><span className="mono">Location</span>{LOCATION}</li>
          </ul>
        </div>
      </div>
    </section>)
}
