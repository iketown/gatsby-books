import { useEffect, useRef } from "react"

export const useMounted = () => {
  let isMounted = useRef(true)
  useEffect(() => {
    return () => (isMounted.current = false)
  }, [])
  return { isMounted: isMounted.current }
}
