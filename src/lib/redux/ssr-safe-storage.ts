import createWebStorage from "redux-persist/lib/storage/createWebStorage"

interface NoopStorageReturnType {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  getItem: (_: any) => Promise<null>
  setItem: (_: any, value: any) => Promise<any>
  removeItem: (_: any) => Promise<void>
}

const createNoopStorage = (): NoopStorageReturnType => {
  return {
    getItem(_: any): Promise<null> {
      return Promise.resolve(null)
    },
    setItem(_: any, value: any): Promise<any> {
      return Promise.resolve(value)
    },
    removeItem(_: any): Promise<void> {
      return Promise.resolve()
    },
  }
}

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage()

export default storage
