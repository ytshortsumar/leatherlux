import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import products from '../data/products'
import './FeaturedProducts.css'

function FeaturedProducts() {
  const featured = products.filter((product) => product.featured)

  return (
    <section className="lux-featured">
      <div className="container">
        <div className="lux-featured-head">
          <span className="lux-featured-tag">Handpicked for You</span>
          <h2 className="lux-featured-title">Featured Products</h2>
          <p className="lux-featured-subtext">
            A selection of our finest full-grain leather pieces, crafted to last a lifetime.
          </p>
        </div>

        <div className="lux-featured-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="lux-featured-cta">
          <Link to="/shop" className="lux-featured-btn">
            View All Products <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
