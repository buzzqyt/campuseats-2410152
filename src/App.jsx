import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import CartPage from './components/CartPage.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [sortBy, setSortBy] = useState('popular')

  // B3 State: cart items as lines of { item, qty }, and view management
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
  const [lastOrder, setLastOrder] = useState(null)

  // B2: Fetch vendors.json
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        if (data.length > 0) {
          setSelectedVendorId(data[0].id)
        }
        setLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [reloadKey])

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

  const sortedMenu = selectedVendor
    ? [...selectedVendor.menu].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        return selectedVendor.menu.indexOf(a) - selectedVendor.menu.indexOf(b)
      })
    : []

  // B3: Add to cart (merges quantity if item is already in cart)
  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existingLine = prevCart.find((line) => line.item.id === item.id)
      if (existingLine) {
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prevCart, { item, qty: 1 }]
    })
  }

  // B3: Change quantity (+1 or -1)
  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) => {
          if (line.item.id === itemId) {
            return { ...line, qty: line.qty + delta }
          }
          return line
        })
        .filter((line) => line.qty > 0) // Automatically remove if qty reaches 0
    )
  }

  // B3: Remove item completely from cart
  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  // B5 placeholder: Place order handler
  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  // B3: Compute total quantity for header badge using reduce
  const cartCount = cart.reduce((total, line) => total + line.qty, 0)

  // Determine what content to display based on view, loading, or error state
  let content
  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    content = (
      <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Order placed successfully!</h2>
        <p>Pickup time: <strong>{lastOrder?.pickupTime}</strong></p>
        <p>Total paid: <strong>RM {lastOrder?.total?.toFixed(2)}</strong></p>
        <button className="btn" onClick={() => setView('menu')} style={{ marginTop: '1rem' }}>
          Back to Vendors
        </button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        {selectedVendor && (
          <section>
            <div className="row" style={{ marginTop: '1rem' }}>
              <h2 className="section-title" style={{ margin: 0 }}>Menu: {selectedVendor.name}</h2>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                Sort by
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                  <option value="popular">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </label>
            </div>
            <MenuList items={sortedMenu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">
        {content}
      </main>
      <Footer />
    </>
  )
}

export default App