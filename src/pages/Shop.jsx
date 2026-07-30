import ProductCard from '../components/ProductCard'
import products from '../data/products'
import './Shop.css'

function Shop() {
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
          <div className="lux-shop-bar">
            <p className="lux-shop-count">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          <div className="lux-shop-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Shop
