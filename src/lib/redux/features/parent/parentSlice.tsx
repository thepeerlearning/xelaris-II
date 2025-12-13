import api, { timeout } from "@/lib/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteCookie, setCookie } from "cookies-next"
import { toast } from "react-toastify"

export const getParentProfile = createAsyncThunk(
  "parent/getParentProfile",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await api.get(`parent-profile`)
      return response.data
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.message ||
        error?.response?.data?.meta.message ||
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
export const updateParentProfile = createAsyncThunk(
  "parent/updateParentProfile",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const formdata = new FormData()

      if (inputData.image) {
        formdata.append("image", inputData.image)
      }

      formdata.append("country", inputData.country)
      formdata.append("timezone", inputData.timezone)

      const response = await api.put(`parent-profile`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.message ||
        error?.response?.data?.meta.message ||
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
export const addChild = createAsyncThunk(
  "parent/addChild",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("parent-add-child", inputData)
      if (response) {
        const { data } = response.data
        setCookie("c_id", data.id)
        return response?.data
      }
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.message ||
        error?.response?.data?.meta.message ||
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
export const updateChild = createAsyncThunk(
  "parent/updateChild",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.put("parent-update-child", inputData)
      if (response) {
        const { data } = response.data
        setCookie("c_id", data.id)
        toast.success("Child information updated successfully")
        return response?.data
      }
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.message ||
        error?.response?.data?.meta.message ||
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
export const updateParentSchool = createAsyncThunk(
  "admin/updateParentSchool",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.put("parent-duration", inputData)
      if (response) {
        toast.success("Child school information updated successfully")
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

export const scheduleClass = createAsyncThunk(
  "parent/scheduleClass",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("parent-schedule", inputData)
      if (response) {
        const { data } = response.data
        setCookie("c_id", data.child_id)
        setCookie("cl_id", data.id)
        return data
      }
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.message ||
        error?.response?.data?.meta.message ||
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
export const parentInitiatePayment = createAsyncThunk(
  "signup/parentInitiatePayment",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post(`parent-initiate`, inputData)
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
        error?.response?.data?.meta.message ||
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
export const getScheduleClass = createAsyncThunk(
  "parent/getScheduleClass",
  async ({ id }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.get(`parent-child-schedule/${id}`)
      return response.data
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.message ||
        error?.response?.data?.meta.message ||
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
export const rescheduleClass = createAsyncThunk(
  "parent/rescheduleClass",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("parent-reschedule", inputData)
      return response?.data
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.message ||
        error?.response?.data?.meta.message ||
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
export const getChildren = createAsyncThunk(
  "parent/getChildren",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await api.get("parent-children")
      return response.data
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.messsage ||
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
export const getSubscriptions = createAsyncThunk(
  "parent/getSubscriptions",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await api.get("parent-subscription")
      return response.data
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.messsage ||
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
export const getActiveSubscriptions = createAsyncThunk(
  "parent/getActiveSubscriptions",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await api.get("parent-active-subscriptions")
      return response.data
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.messsage ||
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
export const cancelSubscription = createAsyncThunk(
  "parent/cancelSubscription",
  async ({ id }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.delete(`parent-active-subscriptions/${id}`)
      return response.data
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.messsage ||
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
export const getPaymentMethod = createAsyncThunk(
  "parent/getPaymentMethod",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await api.get("parent-payment-method")
      return response.data
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.messsage ||
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
export const editPaymentMethod = createAsyncThunk(
  "parent/editPaymentMethod",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.put("parent-payment-method", inputData)
      toast.success("Payment method updated successfully")
      return response.data
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.messsage ||
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

export const changeParentPassword = createAsyncThunk(
  "parent/changeParentPassword",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post(`parent-change-password`, inputData)
      toast.success("Password changed successfully")
      return response.data
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.messsage ||
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
  children: null,
  profile: null,
  subscriptions: null,
  schedules: null,
  schedulingLoading: false,
  schedulingError: false,
  paymentMethod: null,
  methodLoading: false,
  methodError: false,
  activeSubs: null,
}
const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getParentProfile.pending, (state) => {
      state.loading = true
      state.profile = null
      state.error = false
    })
    builder.addCase(getParentProfile.fulfilled, (state, { payload }) => {
      state.loading = false
      state.profile = payload.data
      state.error = false
    })
    builder.addCase(getParentProfile.rejected, (state) => {
      state.loading = false
      state.profile = null
      state.error = true
    })
    builder.addCase(getScheduleClass.pending, (state) => {
      state.schedulingLoading = true
      state.schedules = null
      state.schedulingError = false
    })
    builder.addCase(getScheduleClass.fulfilled, (state, { payload }) => {
      state.schedulingLoading = false
      state.schedules = payload.data
      state.schedulingError = false
    })
    builder.addCase(getScheduleClass.rejected, (state) => {
      state.schedulingLoading = false
      state.schedules = null
      state.schedulingError = true
    })
    builder.addCase(getChildren.pending, (state) => {
      state.loading = true
      state.children = null
      state.error = false
    })
    builder.addCase(getChildren.fulfilled, (state, { payload }) => {
      state.loading = false
      state.children = payload.data
      state.error = false
    })
    builder.addCase(getChildren.rejected, (state) => {
      state.loading = false
      state.children = null
      state.error = true
    })
    builder.addCase(getSubscriptions.pending, (state) => {
      state.loading = true
      state.subscriptions = null
      state.error = false
    })
    builder.addCase(getSubscriptions.fulfilled, (state, { payload }) => {
      state.loading = false
      state.subscriptions = payload.data
      state.error = false
    })
    builder.addCase(getSubscriptions.rejected, (state) => {
      state.loading = false
      state.subscriptions = null
      state.error = true
    })
    builder.addCase(getActiveSubscriptions.pending, (state) => {
      state.loading = true
      state.activeSubs = null
      state.error = false
    })
    builder.addCase(getActiveSubscriptions.fulfilled, (state, { payload }) => {
      state.loading = false
      state.activeSubs = payload.data
      state.error = false
    })
    builder.addCase(getActiveSubscriptions.rejected, (state) => {
      state.loading = false
      state.activeSubs = null
      state.error = true
    })
    builder.addCase(getPaymentMethod.pending, (state) => {
      state.methodLoading = true
      state.paymentMethod = null
      state.methodError = false
    })
    builder.addCase(getPaymentMethod.fulfilled, (state, { payload }) => {
      state.methodLoading = false
      state.paymentMethod = payload.data
      state.methodError = false
    })
    builder.addCase(getPaymentMethod.rejected, (state) => {
      state.methodLoading = false
      state.paymentMethod = null
      state.methodError = true
    })
  },
})
const { reducer } = parentSlice
export default reducer
