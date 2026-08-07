import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ImageGallery from '../components/ImageGallery'
import { getProductById } from '../services/productService'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatPrice'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const [loaded, setLoaded] = useState({ id: null, product: null })
  const [addedId, setAddedId] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    let active = true
    getProductById(id)
      .then((data) => {
        if (!active) return
        setLoaded({ id, product: data })
      })
      .catch(() => {
        if (!active) return
        setLoaded({ id, product: null })
      })
    return () => {
      active = false
    }
  }, [id])

  const loading = loaded.id !== id
  const product = loading ? null : loaded.product

  const justAdded = addedId === id

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product)
    setAddedId(id)
  }

  if (loading) {
    return (
      <div className="lux-page">
        <section className="lux-detail-missing">
          <div className="container">
            <p>Loading…</p>
          </div>
        </section>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="lux-page">
        <section className="lux-detail-missing">
          <div className="container">
            <h1>Product not found</h1>
            <p>We couldn’t find the product you’re looking for.</p>
            <Link to="/shop" className="lux-detail-back">
              Back to Shop
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="lux-page">
      <section className="lux-detail">
        <div className="container">
          <Link to="/shop" className="lux-detail-back">
            ← Back to Shop
          </Link>

          <div className="lux-detail-grid">
            <div className="lux-detail-media">
              <ImageGallery images={[product.image]} name={product.name} />
            </div>

            <div className="lux-detail-info">
              <span className="lux-detail-category">{product.category}</span>
              <h1 className="lux-detail-name">{product.name}</h1>
              <p className="lux-detail-price">{formatPrice(product.price)}</p>
              <p className="lux-detail-description">{product.description}</p>

              {product.details && product.details.length > 0 && (
                <div className="lux-detail-specs">
                  <h2>Details</h2>
                  <ul>
                    {product.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                type="button"
                className="lux-detail-add"
                onClick={handleAddToCart}
              >
                {justAdded ? 'Added ✓' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetail
