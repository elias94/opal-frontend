import { useRef } from 'react'

export function useTimeout() {
  const savedTimeout = useRef()

  return {
    set: (callback, delay) => {
      savedTimeout.current = setTimeout(callback, delay)
    },
    
    clear: () => {
      if (savedTimeout.current) {
        clearTimeout(savedTimeout.current)
      }
    }
  }
}
