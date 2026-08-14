import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="lux-page">
      <section className="lux-page-hero">
        <div className="container">
          <span className="lux-page-tag">Get in Touch</span>
          <h1 className="lux-page-heading">Contact Us</h1>
          <p className="lux-page-subtext">
            Questions about a product, an order, or anything else — send us a message.
          </p>
        </div>
      </section>

      <section className="lux-contact-section">
        <div className="container">
          {submitted ? (
            <div className="lux-contact-success" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <h2 style={{ color: '#6b5b3e', marginBottom: '1rem' }}>Thank You!</h2>
              <p style={{ color: '#5a4d3a', fontSize: '1.1rem' }}>
                Your message has been received. We&apos;ll get back to you shortly.
              </p>
              <button
                className="lux-form-btn"
                style={{ marginTop: '1.5rem' }}
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
          <form className="lux-contact-form" onSubmit={handleSubmit}>
            <div className="lux-form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="lux-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="lux-form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help?"
                required
              ></textarea>
            </div>

            <button type="submit" className="lux-form-btn">Send Message</button>
          </form>
          )}
        </div>
      </section>
    </div>
  )
}

export default Contact