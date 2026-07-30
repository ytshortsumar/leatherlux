import { useParams, Link } from 'react-router-dom'
import ImageGallery from '../components/ImageGallery'
import products from '../data/products'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const product = products.find((item) => item.id === Number(id))

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
              <p className="lux-detail-price">${product.price}</p>
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

              <button type="button" className="lux-detail-add">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetail
