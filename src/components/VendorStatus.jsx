import { useEffect, useState } from 'react'
import { getOpenStatus } from '../utils/openingHours.js'

function VendorStatus({ openHours }) {
  const [timestamp, setTimestamp] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setTimestamp(Date.now()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  const isOpen = getOpenStatus(openHours, timestamp)

  return (
    <>
      <span className={`status ${isOpen === null ? '' : isOpen ? 'open' : 'closed'}`}>
        {isOpen === null ? 'Hours unavailable' : isOpen ? 'Open' : 'Closed'}
      </span>
      <p className="muted">{openHours}</p>
    </>
  )
}

export default VendorStatus
