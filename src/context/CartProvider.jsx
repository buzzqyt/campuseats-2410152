import { useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { CartContext } from './cart-context.js'

function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  const value = useMemo(() => {
    function addToCart(item) {
      setCart((currentCart) => {
        const existing = currentCart.find((line) => line.item.id === item.id)
        if (existing) {
          return currentCart.map((line) =>
            line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
          )
        }
        return [...currentCart, { item, qty: 1 }]
      })
    }

    function changeQty(itemId, delta) {
      setCart((currentCart) =>
        currentCart
          .map((line) =>
            line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
          )
          .filter((line) => line.qty > 0)
      )
    }

    function removeFromCart(itemId) {
      setCart((currentCart) => currentCart.filter((line) => line.item.id !== itemId))
    }

    function placeOrder(details) {
      const order = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        ...details,
        items: cart,
        total,
        placedAt: new Date().toISOString(),
      }
      setOrders((currentOrders) => [order, ...currentOrders])
      setCart([])
      return order
    }

    return {
      cart,
      orders,
      count,
      total,
      addToCart,
      changeQty,
      removeFromCart,
      placeOrder,
    }
  }, [cart, count, orders, setCart, setOrders, total])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
