import { ShieldCheck, HandHeart, Truck, RotateCcw } from 'lucide-react'
import './Features.css'

const features = [
  { icon: ShieldCheck, title: 'Premium Quality', text: 'Finest full-grain leather' },
  { icon: HandHeart, title: 'Handcrafted', text: 'Built with care & precision' },
  { icon: Truck, title: 'Fast & Reliable', text: 'Nationwide delivery' },
  { icon: RotateCcw, title: 'Easy Returns', text: 'Hassle-free returns' },
]

function Features() {
  return (
    <section className="lux-features">
      <div className="container lux-features-grid">
        {features.map(({ icon: Icon, title, text }) => (
          <div className="lux-feature-item" key={title}>
            <Icon className="lux-feature-icon" size={28} strokeWidth={1.5} />
            <div>
              <h4 className="lux-feature-title">{title}</h4>
              <p className="lux-feature-text">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features