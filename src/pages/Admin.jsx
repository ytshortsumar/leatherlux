import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice'
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from '../services/productService'
import './Admin.css'

// Lightweight client-side gate for the admin route. This is NOT real security —
// it only keeps the page out of casual reach. A production build would use
// Firebase Authentication. The passcode comes from VITE_ADMIN_PASSCODE, with a
// fallback so /admin still opens on the live site if the env var is unset.
const ADMIN_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'leatherlux'
const AUTH_KEY = 'lux-admin-auth'

const categories = ['wallets', 'jackets', 'bags', 'belts']

function toForm(product) {
  return {
    id: product.id,
    name: product.name || '',
    category: product.category || 'wallets',
    price: product.price ?? '',
    image: product.image || '',
    featured: Boolean(product.featured),
    description: product.description || '',
    details: Array.isArray(product.details) ? product.details.join('\n') : '',
  }
}

function fromForm(form) {
  return {
    id: form.id,
    name: form.name.trim(),
    category: form.category,
    price: Number(form.price),
    image: form.image.trim(),
    featured: form.featured,
    description: form.description.trim(),
    details: form.details
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean),
  }
}

function AdminGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (value === ADMIN_PASSCODE) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      onUnlock()
    } else {
      setError(true)
    }
  }

  return (
    <div className="lux-admin-gate">
      <form className="lux-admin-gate-card" onSubmit={handleSubmit}>
        <h1 className="lux-admin-gate-title">Admin Access</h1>
        <p className="lux-admin-gate-text">
          Enter the admin passcode to manage products.
        </p>
        <input
          type="password"
          className="lux-admin-gate-input"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            setError(false)
          }}
          placeholder="Passcode"
          autoFocus
        />
        {error && (
          <span className="lux-admin-gate-error">Incorrect passcode.</span>
        )}
        <button type="submit" className="lux-admin-gate-btn">
          Unlock
        </button>
        <Link to="/" className="lux-admin-gate-back">
          ← Back to store
        </Link>
      </form>
    </div>
  )
}

function Admin() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === 'true',
  )

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [editing, setEditing] = useState(null) // form object, or null
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!authed) return
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
  }, [authed])

  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.id - b.id),
    [products],
  )

  const startEdit = (product) => {
    setNotice('')
    setEditing(toForm(product))
  }

  const closeEdit = () => setEditing(null)

  const handleField = (event) => {
    const { name, value, type, checked } = event.target
    setEditing((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSave = async (event) => {
    event.preventDefault()
    const updated = fromForm(editing)
    setSaving(true)
    try {
      await updateProduct(updated)
      setProducts((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      )
      setEditing(null)
      setNotice(`Saved "${updated.name}".`)
    } catch {
      setNotice('Could not save the product. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Delete "${product.name}"? This removes it from Firestore and cannot be undone.`,
    )
    if (!confirmed) return
    setDeletingId(product.id)
    setNotice('')
    try {
      await deleteProduct(product.id)
      setProducts((current) => current.filter((item) => item.id !== product.id))
      setNotice(`Deleted "${product.name}".`)
    } catch {
      setNotice('Could not delete the product. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  if (!authed) {
    return <AdminGate onUnlock={() => setAuthed(true)} />
  }

  return (
    <div className="lux-page">
      <section className="lux-page-hero">
        <div className="container">
          <span className="lux-page-tag">Admin</span>
          <h1 className="lux-page-heading">Manage Products</h1>
          <p className="lux-page-subtext">
            Edit product details or remove products. Changes are saved directly
            to Firestore and appear on the live store.
          </p>
        </div>
      </section>

      <section className="lux-admin">
        <div className="container">
          {notice && <div className="lux-admin-notice">{notice}</div>}

          {loading ? (
            <div className="lux-admin-status">
              <p>Loading products…</p>
            </div>
          ) : error ? (
            <div className="lux-admin-status">
              <p>Something went wrong loading products. Please try again later.</p>
            </div>
          ) : (
            <div className="lux-admin-table-wrap">
              <div className="lux-admin-bar">
                <p className="lux-admin-count">
                  {sortedProducts.length}{' '}
                  {sortedProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>

              <table className="lux-admin-table">
                <thead>
                  <tr>
                    <th className="lux-admin-col-img">Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th className="lux-admin-col-price">Price</th>
                    <th className="lux-admin-col-featured">Featured</th>
                    <th className="lux-admin-col-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="lux-admin-col-img">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="lux-admin-thumb"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.visibility = 'hidden'
                          }}
                        />
                      </td>
                      <td className="lux-admin-name">{product.name}</td>
                      <td className="lux-admin-cat">{product.category}</td>
                      <td className="lux-admin-col-price">
                        {formatPrice(product.price)}
                      </td>
                      <td className="lux-admin-col-featured">
                        {product.featured ? (
                          <span className="lux-admin-badge">Featured</span>
                        ) : (
                          <span className="lux-admin-dash">—</span>
                        )}
                      </td>
                      <td className="lux-admin-col-actions">
                        <button
                          type="button"
                          className="lux-admin-btn lux-admin-btn-edit"
                          onClick={() => startEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="lux-admin-btn lux-admin-btn-delete"
                          onClick={() => handleDelete(product)}
                          disabled={deletingId === product.id}
                        >
                          {deletingId === product.id ? 'Deleting…' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {editing && (
        <div className="lux-admin-modal" role="dialog" aria-modal="true">
          <div
            className="lux-admin-modal-backdrop"
            onClick={closeEdit}
            aria-hidden="true"
          />
          <form className="lux-admin-modal-card" onSubmit={handleSave}>
            <h2 className="lux-admin-modal-title">Edit Product</h2>

            <div className="lux-field">
              <label htmlFor="admin-name">Name</label>
              <input
                type="text"
                id="admin-name"
                name="name"
                value={editing.name}
                onChange={handleField}
                required
              />
            </div>

            <div className="lux-field-row">
              <div className="lux-field">
                <label htmlFor="admin-category">Category</label>
                <select
                  id="admin-category"
                  name="category"
                  value={editing.category}
                  onChange={handleField}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lux-field">
                <label htmlFor="admin-price">Price (Rs)</label>
                <input
                  type="number"
                  id="admin-price"
                  name="price"
                  min="0"
                  value={editing.price}
                  onChange={handleField}
                  required
                />
              </div>
            </div>

            <div className="lux-field">
              <label htmlFor="admin-image">Image path</label>
              <input
                type="text"
                id="admin-image"
                name="image"
                value={editing.image}
                onChange={handleField}
                placeholder="/products/example.png"
              />
            </div>

            <div className="lux-field lux-admin-check">
              <label htmlFor="admin-featured">
                <input
                  type="checkbox"
                  id="admin-featured"
                  name="featured"
                  checked={editing.featured}
                  onChange={handleField}
                />
                <span>Show in Featured Products</span>
              </label>
            </div>

            <div className="lux-field">
              <label htmlFor="admin-description">Description</label>
              <textarea
                id="admin-description"
                name="description"
                rows="3"
                value={editing.description}
                onChange={handleField}
              />
            </div>

            <div className="lux-field">
              <label htmlFor="admin-details">Details (one per line)</label>
              <textarea
                id="admin-details"
                name="details"
                rows="5"
                value={editing.details}
                onChange={handleField}
                placeholder={'Full-grain leather\n6 card slots\nHand-stitched'}
              />
            </div>

            <div className="lux-admin-modal-actions">
              <button
                type="button"
                className="lux-admin-btn lux-admin-btn-cancel"
                onClick={closeEdit}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="lux-admin-btn lux-admin-btn-save"
                disabled={saving}
              >
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Admin