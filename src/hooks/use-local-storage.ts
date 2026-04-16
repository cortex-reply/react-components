import { useState, useEffect, useCallback, SetStateAction, Dispatch } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue: Dispatch<SetStateAction<T>> = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // ignore
    }
  }, [key, storedValue])

  useEffect(() => {
    setValue(storedValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [storedValue, setValue]
}
