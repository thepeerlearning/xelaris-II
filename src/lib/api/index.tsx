import axios from "axios"
import { deleteCookie, getCookie, setCookie } from "cookies-next"

function getLocalAccessToken() {
  if (typeof window !== "undefined") {
    const accessToken = getCookie("t_code")
    return accessToken
  }
}

function getLocalRefreshToken() {
  if (typeof window !== "undefined") {
    const refreshToken = getCookie("refresh_token")
    return refreshToken
  }
}
function updateLocalAccessToken(accessTk: string) {
  let accessToken = getCookie("t_code")
  accessToken = accessTk
  setCookie("t_code", accessToken)
}
export const timeout = 15000
export const baseURL = "https://api.thepeerlearning.com/api/"
const instance = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-type": "application/json",
  },
})

instance.interceptors.request.use(
  (config: any) => {
    const token = getLocalAccessToken()
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res: any) => {
    return res
  },
  async (err: any) => {
    const originalConfig = err.config
    if (
      (originalConfig.url !== `admin-authenticate` && err.response) ||
      (originalConfig.url !== `authenticate` && err.response) ||
      (originalConfig.url !== `parent-authenticate` && err.response)
    ) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        try {
          const refreshTk = getLocalRefreshToken()
          const rs = await instance.post("refresh-token", {
            refreshToken: refreshTk,
          })
          const { data } = rs.data
          updateLocalAccessToken(data.jwtToken)
          return instance(originalConfig)
        } catch (_error) {
          window.location.href = "/unauthorized"
          deleteCookie("t_code")
          deleteCookie("refresh_token")
          return Promise.reject(_error)
        }
      }
    }
    return Promise.reject(err)
  }
)
export default instance
