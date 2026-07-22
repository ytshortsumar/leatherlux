import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.css'


function ProductCard({ product }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div className="lux-card">
      <div className="lux-card-media">
        {imgFailed ? (
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
        <p className="lux-card-price">${product.price}</p>
        <Link to="/shop" className="lux-card-btn">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
