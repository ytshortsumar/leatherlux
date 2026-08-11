import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatPrice'
import './ProductCard.css'

function ProductCard({ product }) {
  const [imgFailed, setImgFailed] = useState(false)
  const { addToCart } = useCart()

  return (
    <div className="lux-card">
      <div className="lux-card-media">
        {imgFailed || !product.image ? (
          <div className="lux-card-fallback">
            <span className="lux-card-fallback-text">{product.name}</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="lux-card-img"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        )}
        <span className="lux-card-category">{product.category}</span>
      </div>

      <div className="lux-card-body">
        <h3 className="lux-card-name">{product.name}</h3>
        <p className="lux-card-price">{formatPrice(product.price)}</p>
        <div className="lux-card-actions">
          <Link to={`/product/${product.id}`} className="lux-card-btn">
            View Details
          </Link>
          <button
            type="button"
            className="lux-card-add"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
