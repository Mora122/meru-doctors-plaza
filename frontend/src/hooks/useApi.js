import { useState, useCallback } from 'react'
import { API_URL } from '../utils/constants'

/**
 * Generic API hook — handles loading, error, and data state.
 *
 * Usage:
 *   const { post, loading, error } = useApi()
 *   await post('/api/appointments', payload)
 */
export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const request = useCallback(async (method, path, body = null) => {
    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem('mdp_token')
      const headers = { 'Content-Type': 'application/json' }
      if (token) headers['Authorization'] = `Bearer ${token}`

      const res = await fetch(`${API_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Request failed')
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    get:    (path)         => request('GET',    path),
    post:   (path, body)   => request('POST',   path, body),
    put:    (path, body)   => request('PUT',    path, body),
    del:    (path)         => request('DELETE', path),
  }
}
