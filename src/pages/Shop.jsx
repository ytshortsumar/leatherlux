import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/productService'
import './Shop.css'

const categories = [
  { key: 'all', label: 'All Products' },
  { key: 'wallets', label: 'Wallets' },
  { key: 'jackets', label: 'Jackets' },
  { key: 'bags', label: 'Bags' },
  { key: 'belts', label: 'Belts' },
]

const pricePresets = [500, 1000, 2000, 5000, 10000, 15000, 20000, 30000, 40000, 50000]

function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const activeCategory = categories.some((c) => c.key === categoryParam)
    ? categoryParam
    : 'all'

  const setActiveCategory = (key) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (key === 'all') {
          next.delete('category')
        } else {
          next.set('category', key)
        }
        return next
      },
      { replace: true },
    )
  }

  const [minPrice, setMinPrice] = useState(pricePresets[0])
  const [maxPrice, setMaxPrice] = useState(pricePresets[pricePresets.length - 1])

  useEffect(() => {
    let active = true
    getProducts()
      .then((data) => {
        if (!active) return
        setProducts(data)
        setLoading(false)
      })
      .catch(() => {
        if (!active) return
        setError(true)
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

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
    minPrice !== pricePresets[0] ||
    maxPrice !== pricePresets[pricePresets.length - 1]

  const resetFilters = () => {
    setActiveCategory('all')
    setMinPrice(pricePresets[0])
    setMaxPrice(pricePresets[pricePresets.length - 1])
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
          {loading ? (
            <div className="lux-shop-status">
              <p>Loading products…</p>
            </div>
          ) : error ? (
            <div className="lux-shop-status">
              <p>Something went wrong loading products. Please try again later.</p>
            </div>
          ) : (
            <>
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
                    <select
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                    >
                      {pricePresets.map((preset) => (
                        <option key={preset} value={preset}>
                          {preset.toLocaleString('en-US')}
                        </option>
                      ))}
                    </select>
                  </label>
                  <span className="lux-shop-price-dash">–</span>
                  <label className="lux-shop-price-field">
                    <span>Max</span>
                    <select
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                    >
                      {pricePresets.map((preset) => (
                        <option key={preset} value={preset}>
                          {preset.toLocaleString('en-US')}
                        </option>
                      ))}
                    </select>
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
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Shop
