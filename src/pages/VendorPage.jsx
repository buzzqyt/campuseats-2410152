import { useState } from 'react'
import { useParams } from 'react-router'
import MenuList from '../components/MenuList.jsx'
import { ErrorMessage, Loading } from '../components/Status.jsx'
import VendorStatus from '../components/VendorStatus.jsx'
import { useVendors } from '../hooks/useVendors.js'

function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()
  const [sortBy, setSortBy] = useState('popular')

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const vendor = vendors.find((entry) => entry.id === id)
  if (!vendor) return <p className="muted">Vendor not found.</p>

  const sortedMenu = [...vendor.menu].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    return vendor.menu.indexOf(a) - vendor.menu.indexOf(b)
  })

  return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>
      <p className="muted">{vendor.location}</p>
      <VendorStatus openHours={vendor.openHours} />
      <div className="row" style={{ justifyContent: 'flex-end', margin: '1rem 0' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          Sort by
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="popular">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </label>
      </div>
      <MenuList items={sortedMenu} />
    </section>
  )
}

export default VendorPage
