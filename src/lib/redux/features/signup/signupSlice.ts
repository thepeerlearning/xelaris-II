import api, { timeout } from "@/lib/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteCookie, setCookie } from "cookies-next"
import { toast } from "react-toastify"

export const adminSignup = createAsyncThunk(
  "signup/adminSignup",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("admin-register", inputData)
      return response?.data
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
export const signup = createAsyncThunk(
  "signup/signup",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("register", inputData)
      if (response) {
        const { data } = response.data
        setCookie("token", data.token)
        setCookie("step", "account_created")
        setCookie("c_id", data.child_id)
        setCookie("stepId", data.id)
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
export const classSchedule = createAsyncThunk(
  "signup/classSchedule",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("schedule", inputData)
      if (response) {
        const { data } = response.data
        setCookie("token", data.token)
        setCookie("c_id", data.child_id)
        setCookie("cl_id", data.id)
        setCookie("step", "class_schedule")
        deleteCookie("stepId")
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

export const initiatePayment = createAsyncThunk(
  "signup/initiatePayment",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post(`initiate`, inputData)
      if (response) {
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
export const validatePayment = createAsyncThunk(
  "signup/validatePayment",
  async ({ token }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.get(`/verify-payment/${token}`)
      if (response) {
        deleteCookie("step")
        deleteCookie("token")
        deleteCookie("c_id")
        deleteCookie("cl_id")
        deleteCookie("stepId")
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
export const validateEmail = createAsyncThunk(
  "signup/validateEmail",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("parent-verify-email", inputData)
      if (response) {
        deleteCookie("step")
        return response.data
      }
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

const initialState = {
  user: null,
  userData: null,
}
const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    updateUserData(state, action: { payload: { data: any } }) {
      const { data } = action.payload
      state.userData = data
    },
    clearUserData(state) {
      state.userData = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.user = null
    })
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.user = payload.data
    })
    builder.addCase(signup.rejected, (state) => {
      state.user = null
    })
  },
})
const { reducer, actions } = signupSlice

export const { updateUserData, clearUserData } = actions

export default reducer
