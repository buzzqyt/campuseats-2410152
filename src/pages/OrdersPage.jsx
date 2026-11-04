import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <section>
        <h2 className="section-title">Your orders</h2>
        <p className="muted">You have no orders yet.</p>
        <Link to="/">Browse vendors</Link>
      </section>
    )
  }

  return (
    <section>
      <h2 className="section-title">Your orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li className="card" key={order.id}>
            <h3>Order for {order.name}</h3>
            <p className="muted">
              {order.mahallah} · Pickup at {order.pickupTime}
            </p>
            <ul>
              {order.items.map((line) => (
                <li key={line.item.id}>
                  {line.qty} × {line.item.name} — RM {(line.item.price * line.qty).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="price">Total: RM {order.total.toFixed(2)}</p>
            <p className="muted">
              Placed {new Date(order.placedAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OrdersPage
