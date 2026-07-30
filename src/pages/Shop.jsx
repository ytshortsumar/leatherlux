import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import products from '../data/products'
import './Shop.css'

// Filter categories — "all" plus every category present in the product data.
const categories = [
  { key: 'all', label: 'All Products' },
  { key: 'wallets', label: 'Wallets' },
  { key: 'jackets', label: 'Jackets' },
  { key: 'bags', label: 'Bags' },
  { key: 'belts', label: 'Belts' },
]

function Shop() {
  const [activeCategory, setActiveCategory] = useState('all')

  const visibleProducts =
    activeCategory === 'all'
      ? products
      : products.filter((product) => product.category === activeCategory)

  return (
    <div className="lux-page">
      <section className="lux-page-hero">
        <div className="container">
          <span className="lux-page-tag">Full Collection</span>
          <h1 className="lux-page-heading">Shop LeatherLux</h1>
          <p className="lux-page-subtext">
            Browse our complete range of full-grain leather goods — wallets,
            jackets, bags, and belts, each crafted to last a lifetime.
          </p>
        </div>
      </section>

      <section className="lux-shop">
        <div className="container">
          <div className="lux-shop-filters">
            {categories.map((category) => (
              <button
                key={category.key}
                type="button"
                className={`lux-shop-filter ${
                  activeCategory === category.key ? 'active' : ''
                }`}
                onClick={() => setActiveCategory(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="lux-shop-bar">
            <p className="lux-shop-count">
              {visibleProducts.length}{' '}
              {visibleProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="lux-shop-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="lux-shop-empty">No products in this category yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default Shop
