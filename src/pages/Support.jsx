import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import supportContent from '../data/supportContent'
import './Support.css'

function Support({ topic }) {
  const content = supportContent[topic]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [topic])

  if (!content) {
    return (
      <div className="lux-support">
        <section className="lux-page-hero">
          <div className="container">
            <span className="lux-page-tag">Customer Service</span>
            <h1 className="lux-page-heading">Page not found</h1>
            <p className="lux-page-subtext">
              We couldn’t find that page. Head back home to keep browsing.
            </p>
          </div>
        </section>
        <div className="container">
          <div className="lux-support-body">
            <Link to="/" className="lux-support-cta">
              Back to home <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="lux-support">
      <section className="lux-page-hero">
        <div className="container">
          <span className="lux-page-tag">{content.tag}</span>
          <h1 className="lux-page-heading">{content.heading}</h1>
          <p className="lux-page-subtext">{content.subtext}</p>
        </div>
      </section>

      <div className="container">
        <div className="lux-support-body">
          {content.faqs ? (
            <div className="lux-support-faq">
              {content.faqs.map((item, i) => (
                <details className="lux-faq-item" key={i}>
                  <summary className="lux-faq-q">
                    <span>{item.q}</span>
                    <span className="lux-faq-icon" aria-hidden="true">+</span>
                  </summary>
                  <p className="lux-faq-a">{item.a}</p>
                </details>
              ))}
            </div>
          ) : (
            content.sections.map((section, i) => (
              <section className="lux-support-section" key={i}>
                {section.heading && (
                  <h2 className="lux-support-h2">{section.heading}</h2>
                )}
                {section.body &&
                  section.body.map((paragraph, j) => (
                    <p className="lux-support-p" key={j}>
                      {paragraph}
                    </p>
                  ))}
                {section.list && (
                  <ul className="lux-support-list">
                    {section.list.map((li, j) => (
                      <li key={j}>{li}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))
          )}

          {content.updated && (
            <p className="lux-support-updated">Last updated: {content.updated}</p>
          )}

          <div className="lux-support-help">
            <p className="lux-support-help-text">Still have a question?</p>
            <Link to="/contact" className="lux-support-cta">
              Contact us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
