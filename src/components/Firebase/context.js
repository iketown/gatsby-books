import React, { useContext } from "react"

const FirebaseContext = React.createContext(null)

export default FirebaseContext

export const useFirebaseCtx = () => {
  const ctx = useContext(FirebaseContext)
  if (!ctx)
    throw new Error(
      "useFirebaseCtx must be a descendant of FirebaseContext.Provider"
    )
  const { user, firebase, loading } = ctx
  return { user, firebase, loading }
}
