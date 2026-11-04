import { useContext } from 'react'
import { CartContext } from '../context/cart-context.js'

export function useCart() {
  const cart = useContext(CartContext)
  if (cart === null) {
    throw new Error('useCart must be used within a CartProvider.')
  }
  return cart
}
