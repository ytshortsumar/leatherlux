import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatPrice'
import './Cart.css'

function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart()

  const [failedImages, setFailedImages] = useState([])

  const markImageFailed = (id) => {
    setFailedImages((current) =>
      current.includes(id) ? current : [...current, id],
    )
  }

  return (
    <div className="lux-page">
      <section className="lux-page-hero">
        <div className="container">
          <span className="lux-page-tag">Your Bag</span>
          <h1 className="lux-page-heading">Shopping Cart</h1>
          <p className="lux-page-subtext">
            Review the items in your cart, adjust quantities, and get ready to
            check out.
          </p>
        </div>
      </section>

      <section className="lux-cart">
        <div className="container">
          {items.length === 0 ? (
            <div className="lux-cart-empty">
              <p>Your cart is empty.</p>
              <Link to="/shop" className="lux-cart-shop-link">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="lux-cart-layout">
              <div className="lux-cart-items">
                {items.map((item) => (
                  <div className="lux-cart-row" key={item.id}>
                    <div className="lux-cart-thumb">
                      {failedImages.includes(item.id) ? (
                        <div className="lux-cart-thumb-fallback">
                          <span>{item.name}</span>
                        </div>
                      ) : (
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          onError={() => markImageFailed(item.id)}
                        />
                      )}
                    </div>

                    <div className="lux-cart-info">
                      <span className="lux-cart-category">{item.category}</span>
                      <h3 className="lux-cart-name">
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </h3>
                      <p className="lux-cart-unit">{formatPrice(item.price)} each</p>
                    </div>

                    <div className="lux-cart-qty">
                      <button
                        type="button"
                        className="lux-cart-qty-btn"
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="lux-cart-qty-value">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="lux-cart-qty-btn"
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <p className="lux-cart-line-total">
                      {formatPrice(item.price * item.quantity)}
                    </p>

                    <button
                      type="button"
                      className="lux-cart-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="lux-cart-clear"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>

              <aside className="lux-cart-summary">
                <h2 className="lux-cart-summary-title">Order Summary</h2>
                <div className="lux-cart-summary-row">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="lux-cart-summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="lux-cart-summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="lux-cart-summary-total">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <Link to="/checkout" className="lux-cart-checkout">
                  Proceed to Checkout
                </Link>
                <Link to="/shop" className="lux-cart-continue">
                  Continue Shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Cart
