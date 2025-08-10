import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import api, { timeout } from "@/lib/api"

export const getNextClassSchedule = createAsyncThunk(
  "student/getNextClassSchedule",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await api.get("child-next-class")
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
export const changeChildPassword = createAsyncThunk(
  "student/changeChildPassword",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("child-change-password", inputData)
      toast.success("Password changed successfully")
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

export const getChildProfile = createAsyncThunk(
  "profile/getChildProfile",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await api.get(`child-profile`)
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
export const updateChildProfile = createAsyncThunk(
  "student/updateProfile",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const formdata = new FormData()
      formdata.append("image", inputData.image)
      formdata.append("name", inputData.name)
      formdata.append("country", inputData.country)
      formdata.append("timezone", inputData.time)

      const response = await api.put(`child-profile`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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

const initialState = {
  loading: false,
  data: null,
  error: false,
  isLoggedIn: false,
  schedules: null,
  scheduleLoading: false,
  scheduleError: false,
  profile: null,
}
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNextClassSchedule.pending, (state) => {
      state.scheduleLoading = true
      state.schedules = null
      state.scheduleError = false
    })
    builder.addCase(getNextClassSchedule.fulfilled, (state, { payload }) => {
      state.scheduleLoading = false
      state.schedules = payload.data
      state.scheduleError = false
    })
    builder.addCase(getNextClassSchedule.rejected, (state) => {
      state.scheduleLoading = false
      state.schedules = null
      state.scheduleError = true
    })
    builder.addCase(getChildProfile.pending, (state) => {
      state.loading = true
      state.profile = null
      state.error = false
    })
    builder.addCase(getChildProfile.fulfilled, (state, { payload }) => {
      state.loading = false
      state.profile = payload.data
      state.error = false
    })
    builder.addCase(getChildProfile.rejected, (state) => {
      state.loading = false
      state.profile = null
      state.error = true
    })
  },
})
const { reducer } = studentSlice
export default reducer
