import VendorCard from '../components/VendorCard.jsx'
import { ErrorMessage, Loading } from '../components/Status.jsx'
import { useVendors } from '../hooks/useVendors.js'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  return (
    <section>
      <h2 className="section-title">Choose a vendor</h2>
      {vendors.length === 0 ? (
        <p className="muted">No vendors are available right now.</p>
      ) : (
        <div className="vendor-grid">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}
    </section>
  )
}

export default HomePage
