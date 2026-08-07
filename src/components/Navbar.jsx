import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import './Navbar.css'

function Navbar() {
  const categories = ['Wallets', 'Jackets', 'Bags', 'Belts']
  const { totalItems } = useCart()

  return (
    <nav className="navbar navbar-expand-lg lux-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand lux-brand" to="/">
          Leather<span className="lux-brand-accent">Lux</span>
        </Link>

        <div className="lux-navbar-actions order-lg-2">
          <Link
            className="lux-cart-link"
            to="/cart"
            aria-label={`Cart with ${totalItems} items`}
          >
            <ShoppingCart size={22} strokeWidth={1.75} />
            {totalItems > 0 && (
              <span className="lux-cart-badge">{totalItems}</span>
            )}
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            aria-controls="navMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse order-lg-1" id="navMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-4 align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link lux-nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle lux-nav-link"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Shop
              </a>
              <ul className="dropdown-menu lux-dropdown-menu">
                <li><Link className="dropdown-item lux-dropdown-item" to="/shop">All Products</Link></li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      className="dropdown-item lux-dropdown-item"
                      to={`/shop?category=${cat.toLowerCase()}`}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link lux-nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link lux-nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
