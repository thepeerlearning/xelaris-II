import api, { timeout } from "@/lib/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { setCookie } from "cookies-next"
import { toast } from "react-toastify"

export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("admin-authenticate", inputData)

      if (response) {
        const { data } = response.data
        setCookie("t_code", data.jwtToken)
        return data
      }
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        error?.toString()
      if (error.message === `timeout of ${timeout}ms exceeded`) {
        message = "Response timeout, Retry"
      }
      if (error.message === "Network Error") {
        message = "Please check your network connectivity"
      }
      toast.error(message)
      return rejectWithValue()
    }
  }
)
export const childLogin = createAsyncThunk(
  "auth/childLogin",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("child-authenticate", inputData)
      if (response) {
        const { data } = response.data
        setCookie("t_code", data.jwtToken)
        return data
      }
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        error?.toString()
      if (error.message === `timeout of ${timeout}ms exceeded`) {
        message = "Response timeout, Retry"
      }
      if (error.message === "Network Error") {
        message = "Please check your network connectivity"
      }
      toast.error(message)
      return rejectWithValue()
    }
  }
)
export const parentlogin = createAsyncThunk(
  "auth/parentlogin",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("parent-authenticate", inputData)

      if (response) {
        const { data } = response.data
        setCookie("t_code", data.jwtToken)
        return data
      }
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        error?.toString()
      if (error.message === `timeout of ${timeout}ms exceeded`) {
        message = "Response timeout, Retry"
      }
      if (error.message === "Network Error") {
        message = "Please check your network connectivity"
      }
      toast.error(message)
      return rejectWithValue()
    }
  }
)
export const forgotpassword = createAsyncThunk(
  "auth/forgotpassword",
  async ({ email }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("forgot-password", { email })
      return response.data
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.message ||
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.toString()

      if (error.message === `timeout of ${timeout}ms exceeded`) {
        message = "Response timeout, Retry"
      }
      if (error.message === "Network Error") {
        message = "Please check your network connectivity"
      }
      toast.error(message)
      return rejectWithValue()
    }
  }
)
export const validateForgotPasswordEmail = createAsyncThunk(
  "auth/validateForgotPasswordEmail",
  async ({ token }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("verify-email", token)
      return response.data
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.message ||
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.toString()
      if (error.message === `timeout of ${timeout}ms exceeded`) {
        message = "Response timeout, Retry"
      }
      if (error.message === "Network Error") {
        message = "Please check your network connectivity"
      }
      toast.error(message)
      return rejectWithValue()
    }
  }
)
export const resetpassword = createAsyncThunk(
  "auth/resetpassword",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("reset-password", inputData)
      return response.data
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.message ||
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.toString()
      if (error.message === `timeout of ${timeout}ms exceeded`) {
        message = "Response timeout, Retry"
      }
      if (error.message === "Network Error") {
        message = "Please check your network connectivity"
      }
      toast.error(message)
      return rejectWithValue()
    }
  }
)
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post(`change-password`, inputData)
      if (response) {
        toast.success("Password changed successfully")
        return response.data
      }
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.message ||
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.toString()
      if (error.message === `timeout of ${timeout}ms exceeded`) {
        message = "Response timeout, Retry"
      }
      if (error.message === "Network Error") {
        message = "Please check your network connectivity"
      }
      toast.error(message)
      return rejectWithValue()
    }
  }
)

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isLoggedIn = false
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogin.fulfilled, (state, { payload }) => {
      state.isLoggedIn = true
      state.user = payload
    })
    builder.addCase(childLogin.fulfilled, (state, { payload }) => {
      state.isLoggedIn = true
      state.user = payload
    })
    builder.addCase(parentlogin.fulfilled, (state, { payload }) => {
      state.isLoggedIn = true
      state.user = payload
    })
    builder.addCase(validateForgotPasswordEmail.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

const { reducer, actions } = authSlice
export const { logout } = actions
export default reducer
