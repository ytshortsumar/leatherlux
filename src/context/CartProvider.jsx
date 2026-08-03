import { useEffect, useMemo, useState } from 'react'
import { CartContext } from './CartContext'

const STORAGE_KEY = 'leatherlux-cart'

// Read any previously saved cart from localStorage so items persist across
// reloads and navigation. Runs once as the lazy initial state.
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

  // Keep localStorage in sync whenever the cart changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Ignore write errors (e.g. storage full or unavailable).
    }
  }, [items])

  const value = useMemo(() => {
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

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
