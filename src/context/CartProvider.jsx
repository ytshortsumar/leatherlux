import { useEffect, useMemo, useRef, useState } from 'react'
import { CartContext } from './CartContext'
import './Toast.css'

const STORAGE_KEY = 'leatherlux-cart'

function readStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart)
  const [toast, setToast] = useState(null)
  const toastId = useRef(0)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      void 0
    }
  }, [items])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(timer)
  }, [toast])

  const value = useMemo(() => {
    const showToast = (message) => {
      toastId.current += 1
      setToast({ key: toastId.current, message })
    }

    const addToCart = (product, quantity = 1) => {
      setItems((current) => {
        const existing = current.find((item) => item.id === product.id)
        if (existing) {
          return current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        }
        return [
          ...current,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity,
          },
        ]
      })
      showToast(`${product.name} added to cart successfully`)
    }

    const removeFromCart = (id) => {
      setItems((current) => current.filter((item) => item.id !== id))
    }

    const updateQuantity = (id, quantity) => {
      setItems((current) => {
        if (quantity <= 0) {
          return current.filter((item) => item.id !== id)
        }
        return current.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        )
      })
    }

    const clearCart = () => setItems([])

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )

    return {
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }
  }, [items])

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && (
        <div className="lux-toast" role="status" aria-live="polite">
          <span className="lux-toast-check">✓</span>
          {toast.message}
        </div>
      )}
    </CartContext.Provider>
  )
}

export default CartProvider
