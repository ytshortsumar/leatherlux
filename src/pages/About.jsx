import { Link } from 'react-router-dom'
import heroImg from '../assets/hero/hero-2.webp'
import materialImg from '../assets/hero/hero-1.webp'
import './About.css'

const steps = [
  {
    n: '01',
    title: 'Selecting the hide',
    text: 'We start with full-grain hides — the top layer, left unsanded so the natural grain and strength stay intact.',
  },
  {
    n: '02',
    title: 'Cutting by hand',
    text: 'Every panel is cut by hand from the strongest sections of the hide, working around natural marks instead of hiding them.',
  },
  {
    n: '03',
    title: 'Saddle-stitching',
    text: 'Seams are saddle-stitched with waxed thread, so a single cut stitch can never unravel the whole row.',
  },
  {
    n: '04',
    title: 'Burnishing & finishing',
    text: 'Edges are sanded, sealed, and burnished by hand, and every piece of hardware is solid brass set to take daily use.',
  },
]

function About() {
  return (
    <div className="lux-about">
      <section className="lux-about-hero">
        <img className="lux-about-hero-img" src={heroImg} alt="" aria-hidden="true" />
        <span className="lux-about-hero-veil" aria-hidden="true" />
        <div className="container">
          <div className="lux-about-hero-content">
            <span className="lux-about-eyebrow">Our craft · Dera Ghazi Khan</span>
            <h1 className="lux-about-hero-title">
              We make leather
              <br />
              the slow way.
            </h1>
            <p className="lux-about-hero-lead">
              Full-grain hides, hand-stitched seams, and solid brass hardware — a few
              pieces, made properly and built to last for years.
            </p>
          </div>
        </div>
      </section>

      <section className="lux-about-intro">
        <div className="container">
          <div className="lux-about-intro-grid">
            <span className="lux-about-eyebrow lux-about-eyebrow-dark">The idea</span>
            <p className="lux-about-statement">
              LeatherLux started with a small frustration: almost everything sold as
              “leather” today is bonded scraps and a plastic coating that cracks inside a
              year. <span className="lux-about-accent">So we went the other way</span> —
              real full-grain hides, cut and stitched by hand, and finished to be used
              every single day.
            </p>
          </div>
          <p className="lux-about-meta">
            <span>100% full-grain leather</span>
            <span>Hand-stitched seams</span>
            <span>Solid brass hardware</span>
          </p>
        </div>
      </section>

      <section className="lux-about-process">
        <div className="container">
          <div className="lux-about-head">
            <span className="lux-about-eyebrow lux-about-eyebrow-dark">At the bench</span>
            <h2 className="lux-about-h2">Four steps, no shortcuts</h2>
          </div>
          <ol className="lux-about-steps">
            {steps.map((s) => (
              <li className="lux-about-step" key={s.n}>
                <span className="lux-about-step-num">{s.n}</span>
                <h3 className="lux-about-step-title">{s.title}</h3>
                <p className="lux-about-step-text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="lux-about-material">
        <div className="container">
          <div className="lux-about-material-grid">
            <div className="lux-about-material-media">
              <img src={materialImg} alt="Full-grain leather, close up" loading="lazy" />
            </div>
            <div className="lux-about-material-text">
              <span className="lux-about-eyebrow lux-about-eyebrow-dark">The material</span>
              <h2 className="lux-about-h2">Why full-grain, always</h2>
              <p>
                Full-grain is the toughest, most durable layer of the hide. Because it is
                left whole rather than sanded smooth, it keeps the natural grain — and it
                is the only leather that genuinely improves with age instead of wearing
                out.
              </p>
              <p>
                With use it darkens and softens into a patina that becomes uniquely yours.
                We never use bonded or “genuine” leather, and we never coat a hide in
                plastic to fake a finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lux-about-quote">
        <div className="container">
          <blockquote className="lux-about-quote-text">
            We’d rather make a few things properly than a hundred things fast.
          </blockquote>
          <p className="lux-about-quote-by">
            Quality over quantity — in every wallet, bag, jacket, and belt we make.
          </p>
        </div>
      </section>

      <section className="lux-about-visit">
        <div className="container">
          <div className="lux-about-visit-card">
            <div className="lux-about-visit-info">
              <span className="lux-about-eyebrow lux-about-eyebrow-dark">
                Come see for yourself
              </span>
              <h2 className="lux-about-h2">Visit the workshop</h2>
              <p className="lux-about-visit-addr">
                Shop No. 15, Near Pakistani Chowk
                <br />
                Dera Ghazi Khan, Pakistan
              </p>
              <p className="lux-about-visit-hours">Open Monday–Saturday · 11am – 9pm</p>
            </div>
            <div className="lux-about-visit-cta">
              <Link to="/contact" className="lux-about-btn">
                Get in touch <span aria-hidden="true">→</span>
              </Link>
              <Link to="/shop" className="lux-about-link">
                Browse the collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
