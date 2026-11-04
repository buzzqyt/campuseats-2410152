import { useCallback, useEffect, useState } from 'react'

export function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => {
    setLoading(true)
    setError(null)
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Vendor data must be an array.')
        }
        setVendors(data)
        setLoading(false)
      })
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [reloadKey])

  return { vendors, loading, error, reload }
}
