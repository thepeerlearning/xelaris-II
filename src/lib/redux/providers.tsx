"use client"
import { useEffect, useRef } from "react"
import { Provider } from "react-redux"
import { persistStore, type Persistor } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import { AppStore, makeStore } from "."
import { setupListeners } from "@reduxjs/toolkit/query"

interface StoreProviderProps {
  children: React.ReactNode
}
export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null)
  const persistorRef = useRef<Persistor>({} as Persistor)

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    persistorRef.current = persistStore(storeRef.current)
  }
  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch)
      return unsubscribe
    }
  }, [])
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  )
}
