import { Link } from 'react-router'
import VendorStatus from './VendorStatus.jsx'

function VendorCard({ vendor }) {
  return (
    <Link to={`/vendor/${vendor.id}`} className="card vendor-card">
      <div className="thumb" aria-hidden="true">
        {vendor.name.charAt(0)}
      </div>
      <div>
        <VendorStatus openHours={vendor.openHours} />
        <h3>{vendor.name}</h3>
        <p className="muted">{vendor.location}</p>
      </div>
    </Link>
  )
}

export default VendorCard