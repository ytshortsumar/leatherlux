import { createContext } from 'react'

// Cart state is shared across the whole app through this context.
// The provider lives in CartProvider.jsx and the useCart hook in hooks/useCart.js.
export const CartContext = createContext(null)
