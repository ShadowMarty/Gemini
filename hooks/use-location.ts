'use client'

import { create } from 'zustand'
import { useEffect } from 'react'

interface LocationState {
  location: string
  isLoading: boolean
  error: string | null
  setLocation: (location: string) => void
  setError: (error: string | null) => void
  setLoading: (isLoading: boolean) => void
}

export const useLocation = create<LocationState>((set) => ({
  location: '',
  isLoading: true,
  error: null,
  setLocation: (location) => set({ location }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading })
}))

export function useInitializeLocation() {
  const { setLocation, setError, setLoading } = useLocation()

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        if (data.error) {
          throw new Error(data.reason || 'Failed to fetch location')
        }
        setLocation(`${data.city}, ${data.region}, ${data.country_name}`)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch location')
      } finally {
        setLoading(false)
      }
    }

    fetchLocation()
  }, [setLocation, setError, setLoading])
}

