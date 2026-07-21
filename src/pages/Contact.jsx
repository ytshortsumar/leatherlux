import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // We Will add Firebase integration  in Module 2 or in future updates
    console.log('Contact form submitted:', form)
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
        </div>
      </section>
    </div>
  )
}

export default Contact