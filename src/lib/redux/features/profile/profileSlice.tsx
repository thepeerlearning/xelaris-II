import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import api, { timeout } from "@/lib/api"

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await api.get(`profile`)
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
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const formdata = new FormData()
      formdata.append("image", inputData.image)
      formdata.append("last_name", inputData.lastname)
      formdata.append("first_name", inputData.firstname)
      formdata.append("email", inputData.email)
      formdata.append("state_of_origin", inputData.state_of_origin)
      formdata.append("address", inputData.address)
      formdata.append("country", inputData.country)
      formdata.append("state_province_of_origin", inputData.state_of_origin)
      formdata.append("dob", inputData.dob)
      formdata.append("gender", inputData.gender)
      formdata.append("timezone", inputData.time)

      const response = await api.put(`profile`, formdata, {
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
  error: false,
  profile: null,
}
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true
      state.error = false
      state.profile = null
    })
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = false
      state.profile = payload.data
    })
    builder.addCase(getProfile.rejected, (state) => {
      state.loading = false
      state.error = false
      state.profile = null
    })
  },
})
const { reducer } = profileSlice
export default reducer
