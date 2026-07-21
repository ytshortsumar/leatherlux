import './About.css'

function About() {
  return (
    <div className="lux-page">
      <section className="lux-page-hero">
        <div className="container">
          <span className="lux-page-tag">Our Craft</span>
          <h1 className="lux-page-heading">About LeatherLux</h1>
          <p className="lux-page-subtext">
            Built on full-grain leather, honest construction, and a refusal
            to cut corners.
          </p>
        </div>
      </section>

      <section className="lux-about-section">
        <div className="container">
          <div className="lux-about-block">
            <h2>Materials & Process</h2>
            <p>
              Every LeatherLux piece starts with full-grain leather — the
              toughest, most durable layer of the hide, left unsanded so its
              natural grain stays intact. It's the only leather that
              genuinely improves with age instead of wearing out.
            </p>
            <p>
              From there, each wallet, bag, jacket, and belt is cut, stitched,
              and finished by hand. Edges are burnished, not just cut and
              left raw. Hardware is solid brass, chosen to hold up to daily
              use for years, not months.
            </p>
          </div>

          <div className="lux-about-grid">
            <div className="lux-about-card">
              <h3>Full-Grain Leather</h3>
              <p>Sourced for durability and natural character, not uniformity.</p>
            </div>
            <div className="lux-about-card">
              <h3>Hand-Stitched</h3>
              <p>Saddle-stitched by hand for seams that won't unravel.</p>
            </div>
            <div className="lux-about-card">
              <h3>Solid Brass Hardware</h3>
              <p>Built to outlast the leather it's attached to.</p>
            </div>
            <div className="lux-about-card">
              <h3>Made to Last</h3>
              <p>No synthetic shortcuts — pieces meant to be used for years.</p>
            </div>
          </div>

          <div className="lux-about-block">
            <h2>Our Mission</h2>
            <p>
              We're not chasing trends or seasonal drops. In a market full of
              fast fashion and synthetic leather that falls apart in a year,
              LeatherLux is built around the opposite idea: fewer pieces,
              made properly, meant to outlast the fashion cycle entirely.
              Quality over quantity, every time.
            </p>
          </div>

          <div className="lux-about-visit">
            <h2>Visit Our Store</h2>
            <p>Shop Number 15, Near Pakistani Chowk, Dera Ghazi Khan</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About