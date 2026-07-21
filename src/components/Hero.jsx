import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import heroImg1 from '../assets/hero/hero-1.png'
import heroImg2 from '../assets/hero/hero-2.png'
import heroImg3 from '../assets/hero/hero-3.png'
import './Hero.css'

const images = [heroImg1, heroImg2, heroImg3]

function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="lux-hero">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="LeatherLux premium leather goods"
          className={`lux-hero-bg ${index === active ? 'active' : ''}`}
        />
      ))}

      <div className="lux-hero-overlay"></div>

      <div className="container lux-hero-content">
        <span className="lux-hero-tag">Premium Leather. Made by Hand.</span>
        <h1 className="lux-hero-heading">
          Timeless Leather,<br />
          <span className="lux-brand-accent">Crafted to Last</span>
        </h1>
        <p className="lux-hero-subtext">
          Wallets, bags, jackets, and belts in full-grain leather —
          made to be used, not just owned.
        </p>
        <Link to="/shop" className="lux-hero-btn">
          Shop Now <span>→</span>
        </Link>
      </div>

      <div className="lux-hero-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`lux-hero-dot ${index === active ? 'active' : ''}`}
            onClick={() => setActive(index)}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero