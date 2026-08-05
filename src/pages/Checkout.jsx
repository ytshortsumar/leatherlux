import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import './Checkout.css'

const initialDetails = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  notes: '',
}

function Checkout() {
  const { items, totalItems, totalPrice } = useCart()
  const [details, setDetails] = useState(initialDetails)

  const handleChange = (event) => {
    const { name, value } = event.target
    setDetails((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    // Order placement is wired up in a later task; for now just prevent the
    // default page reload so the form UI can be reviewed on its own.
    event.preventDefault()
  }

  return (
    <div className="lux-page">
      <section className="lux-page-hero">
        <div className="container">
          <span className="lux-page-tag">Almost There</span>
          <h1 className="lux-page-heading">Checkout</h1>
          <p className="lux-page-subtext">
            Enter your details below and review your order before placing it.
          </p>
        </div>
      </section>

      <section className="lux-checkout">
        <div className="container">
          {items.length === 0 ? (
            <div className="lux-checkout-empty">
              <p>Your cart is empty, so there is nothing to check out.</p>
              <Link to="/shop" className="lux-checkout-shop-link">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="lux-checkout-layout">
              <form className="lux-checkout-form" onSubmit={handleSubmit}>
                <h2 className="lux-checkout-section-title">Customer Details</h2>

                <div className="lux-field">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={details.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Umar Farooq"
                  />
                </div>

                <div className="lux-field-row">
                  <div className="lux-field">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={details.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="lux-field">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={details.phone}
                      onChange={handleChange}
                      placeholder="03xx-xxxxxxx"
                    />
                  </div>
                </div>

                <div className="lux-field">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={details.address}
                    onChange={handleChange}
                    placeholder="Street address"
                  />
                </div>

                <div className="lux-field-row">
                  <div className="lux-field">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={details.city}
                      onChange={handleChange}
                      placeholder="City"
                    />
                  </div>

                  <div className="lux-field">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={details.postalCode}
                      onChange={handleChange}
                      placeholder="Postal code"
                    />
                  </div>
                </div>

                <div className="lux-field">
                  <label htmlFor="notes">Order Notes (optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    value={details.notes}
                    onChange={handleChange}
                    placeholder="Any special instructions for your order?"
                  />
                </div>

                <button type="submit" className="lux-checkout-place">
                  Place Order
                </button>
              </form>

              <aside className="lux-checkout-summary">
                <h2 className="lux-checkout-summary-title">Order Summary</h2>

                <div className="lux-checkout-summary-items">
                  {items.map((item) => (
                    <div className="lux-checkout-summary-item" key={item.id}>
                      <span className="lux-checkout-item-name">
                        {item.name}
                        <span className="lux-checkout-item-qty">
                          × {item.quantity}
                        </span>
                      </span>
                      <span className="lux-checkout-item-price">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="lux-checkout-summary-row">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="lux-checkout-summary-row">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="lux-checkout-summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="lux-checkout-summary-total">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>

                <Link to="/cart" className="lux-checkout-back">
                  ← Back to Cart
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Checkout
