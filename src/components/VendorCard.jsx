function VendorCard({ vendor, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={`card vendor-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(vendor.id)}
    >
      <div className="thumb" aria-hidden="true">
        {vendor.name.charAt(0)}
      </div>
      <div>
        <span className={`status ${vendor.isOpen ? 'open' : 'closed'}`}>
          {vendor.isOpen ? 'Open' : 'Closed'}
        </span>
        <h3>{vendor.name}</h3>
        <p className="muted">{vendor.location}</p>
        <p className="muted">{vendor.openHours}</p>
      </div>
    </button>
  )
}

export default VendorCard