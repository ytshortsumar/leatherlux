import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatPrice'
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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[0-9+\-\s()]{7,}$/

function validateField(name, value) {
  const trimmed = value.trim()
  switch (name) {
    case 'fullName':
      if (!trimmed) return 'Full name is required.'
      if (trimmed.length < 3) return 'Please enter your full name.'
      return ''
    case 'email':
      if (!trimmed) return 'Email is required.'
      if (!emailPattern.test(trimmed)) return 'Please enter a valid email address.'
      return ''
    case 'phone':
      if (!trimmed) return 'Phone number is required.'
      if (!phonePattern.test(trimmed)) return 'Please enter a valid phone number.'
      return ''
    case 'address':
      if (!trimmed) return 'Address is required.'
      return ''
    case 'city':
      if (!trimmed) return 'City is required.'
      return ''
    case 'postalCode':
      if (!trimmed) return 'Postal code is required.'
      if (!/^[0-9]{4,}$/.test(trimmed)) return 'Please enter a valid postal code.'
      return ''
    default:
      return ''
  }
}

const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'postalCode']

function Checkout() {
  const { items, totalItems, totalPrice, clearCart } = useCart()
  const [details, setDetails] = useState(initialDetails)
  const [errors, setErrors] = useState({})
  const [placed, setPlaced] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setDetails((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    const message = validateField(name, value)
    setErrors((current) => ({ ...current, [name]: message }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    requiredFields.forEach((field) => {
      const message = validateField(field, details[field])
      if (message) nextErrors[field] = message
    })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = requiredFields.find((field) => nextErrors[field])
      if (firstInvalid) {
        const el = document.getElementById(firstInvalid)
        if (el) el.focus()
      }
      return
    }
    setPlaced(true)
    clearCart()
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
          {placed ? (
            <div className="lux-checkout-success">
              <div className="lux-checkout-success-icon">✓</div>
              <h2>Thank you for your order!</h2>
              <p>
                Your order has been placed successfully. A confirmation will be
                sent to your email shortly.
              </p>
              <Link to="/shop" className="lux-checkout-shop-link">
                Continue Shopping
              </Link>
            </div>
          ) : items.length === 0 ? (
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

                <div className={`lux-field${errors.fullName ? ' has-error' : ''}`}>
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={details.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Umar Farooq"
                  />
                  {errors.fullName && (
                    <span className="lux-field-error">{errors.fullName}</span>
                  )}
                </div>

                <div className="lux-field-row">
                  <div className={`lux-field${errors.email ? ' has-error' : ''}`}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={details.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <span className="lux-field-error">{errors.email}</span>
                    )}
                  </div>

                  <div className={`lux-field${errors.phone ? ' has-error' : ''}`}>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={details.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="03xx-xxxxxxx"
                    />
                    {errors.phone && (
                      <span className="lux-field-error">{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div className={`lux-field${errors.address ? ' has-error' : ''}`}>
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={details.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Street address"
                  />
                  {errors.address && (
                    <span className="lux-field-error">{errors.address}</span>
                  )}
                </div>

                <div className="lux-field-row">
                  <div className={`lux-field${errors.city ? ' has-error' : ''}`}>
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={details.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="City"
                    />
                    {errors.city && (
                      <span className="lux-field-error">{errors.city}</span>
                    )}
                  </div>

                  <div className={`lux-field${errors.postalCode ? ' has-error' : ''}`}>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={details.postalCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Postal code"
                    />
                    {errors.postalCode && (
                      <span className="lux-field-error">{errors.postalCode}</span>
                    )}
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
                        {formatPrice(item.price * item.quantity)}
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
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="lux-checkout-summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="lux-checkout-summary-total">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
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
