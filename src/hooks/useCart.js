import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

// Convenience hook so components can read the cart without importing the
// context directly. Throws if used outside the CartProvider.
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
