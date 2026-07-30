import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import products from '../data/products'
import './Shop.css'

const categories = [
  { key: 'all', label: 'All Products' },
  { key: 'wallets', label: 'Wallets' },
  { key: 'jackets', label: 'Jackets' },
  { key: 'bags', label: 'Bags' },
  { key: 'belts', label: 'Belts' },
]

const priceValues = products.map((product) => product.price)
const MIN_PRICE = Math.min(...priceValues)
const MAX_PRICE = Math.max(...priceValues)

function Shop() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [minPrice, setMinPrice] = useState(MIN_PRICE)
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)

  const lowPrice = Math.min(minPrice, maxPrice)
  const highPrice = Math.max(minPrice, maxPrice)

  const visibleProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory
    const matchesPrice =
      product.price >= lowPrice && product.price <= highPrice
    return matchesCategory && matchesPrice
  })

  const isFiltered =
    activeCategory !== 'all' ||
    minPrice !== MIN_PRICE ||
    maxPrice !== MAX_PRICE

  const resetFilters = () => {
    setActiveCategory('all')
    setMinPrice(MIN_PRICE)
    setMaxPrice(MAX_PRICE)
  }

  const clampPrice = (value, fallback) => {
    const parsed = Number(value)
    if (Number.isNaN(parsed)) return fallback
    return Math.min(Math.max(parsed, MIN_PRICE), MAX_PRICE)
  }

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

          <div className="lux-shop-price">
            <span className="lux-shop-price-label">Price range</span>
            <div className="lux-shop-price-inputs">
              <label className="lux-shop-price-field">
                <span>Min</span>
                <span className="lux-shop-price-prefix">$</span>
                <input
                  type="number"
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  value={minPrice}
                  onChange={(e) => setMinPrice(clampPrice(e.target.value, MIN_PRICE))}
                />
              </label>
              <span className="lux-shop-price-dash">–</span>
              <label className="lux-shop-price-field">
                <span>Max</span>
                <span className="lux-shop-price-prefix">$</span>
                <input
                  type="number"
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(clampPrice(e.target.value, MAX_PRICE))}
                />
              </label>
            </div>
          </div>

          <div className="lux-shop-bar">
            <p className="lux-shop-count">
              {visibleProducts.length}{' '}
              {visibleProducts.length === 1 ? 'product' : 'products'}
            </p>
            {isFiltered && (
              <button
                type="button"
                className="lux-shop-reset"
                onClick={resetFilters}
              >
                Reset filters
              </button>
            )}
          </div>

          {visibleProducts.length > 0 ? (
            <div className="lux-shop-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="lux-shop-empty">
              <p>No products match these filters.</p>
              <button
                type="button"
                className="lux-shop-reset"
                onClick={resetFilters}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Shop
