import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import api, { timeout } from "@/lib/api"

export const changeAdminPassword = createAsyncThunk(
  "parent/changeAdminPassword",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post(`admin-change-password`, inputData)
      toast.success("Password changed successfully")
      return response.data
    } catch (error: any) {
      let message =
        error?.response?.data?.meta?.messsage ||
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
export const getStudents = createAsyncThunk(
  "admin/getStudents",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await api.get("admin-students")
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

export const getAdminReschedules = createAsyncThunk(
  "admin/getAdminReschedules",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await api.get("admin-reschedule")
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
export const acceptRequest = createAsyncThunk(
  "admin/acceptRequest",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("admin-reschedule", inputData)
      if (response) {
        toast.success("Reschedule request accepted successfully")
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
export const deleteStudent = createAsyncThunk(
  "admin/deleteStudent",
  async ({ id }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.delete(`admin-child/${id}`)
      if (response) {
        toast.success("Student deleted successfully")
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

//SCHOOLS
export const getSchools = createAsyncThunk(
  "admin/getSchools",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await api.get("schools")
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
export const addSchool = createAsyncThunk(
  "admin/addSchool",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("school", inputData)
      if (response) {
        toast.success("School added successfully")
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
export const updateSchool = createAsyncThunk(
  "parent/updateSchool",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.put("school", inputData)
      if (response) {
        toast.success("School information updated successfully")
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
export const deleteSchool = createAsyncThunk(
  "admin/deleteSchool",
  async ({ id }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.delete(`school/${id}`)
      if (response) {
        toast.success("School deleted successfully")
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
export const addPrice = createAsyncThunk(
  "admin/addPrice",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("price", inputData)
      if (response) {
        toast.success("Price added successfully")
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
export const updatePrice = createAsyncThunk(
  "admin/updateSchool",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.put("price", inputData)
      if (response) {
        toast.success("Price updated successfully")
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
export const deletePrice = createAsyncThunk(
  "admin/deletePrice",
  async ({ id }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.delete(`price/${id}`)
      if (response) {
        toast.success("Price deleted successfully")
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
//COURSES
export const getCourses = createAsyncThunk(
  "admin/getCourses",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await api.get("courses")
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
export const addCourse = createAsyncThunk(
  "admin/addCourse",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.post("course", inputData)
      if (response) {
        toast.success("Course added successfully")
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
export const updateCourse = createAsyncThunk(
  "admin/updateCourse",
  async ({ inputData }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.put("course", inputData)
      if (response) {
        toast.success("Course updated successfully")
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
export const deleteCourse = createAsyncThunk(
  "admin/deleteCourse",
  async ({ id }: any, { rejectWithValue }: any) => {
    try {
      const response = await api.delete(`course/${id}`)
      if (response) {
        toast.success("Course deleted successfully")
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
  loading: false,
  data: null,
  error: false,
  isLoggedIn: false,
  courses: null,
  students: null,
  schools: null,
  schedules: null,
}
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CLASSES
    builder.addCase(getSchools.pending, (state) => {
      state.loading = true
      state.schools = null
      state.error = false
    })
    builder.addCase(getSchools.fulfilled, (state, action) => {
      state.loading = false
      state.schools = action.payload.data
      state.error = false
    })
    builder.addCase(getSchools.rejected, (state) => {
      state.loading = false
      state.schools = null
      state.error = true
    })
    builder.addCase(getAdminReschedules.pending, (state) => {
      state.loading = true
      state.schedules = null
      state.error = false
    })
    builder.addCase(getAdminReschedules.fulfilled, (state, action) => {
      state.loading = false
      state.schedules = action.payload.data
      state.error = false
    })
    builder.addCase(getAdminReschedules.rejected, (state) => {
      state.loading = false
      state.schedules = null
      state.error = true
    })
    //COURSES
    builder.addCase(getCourses.pending, (state) => {
      state.loading = true
      state.courses = null
      state.error = false
    })
    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.loading = false
      state.courses = action.payload.data
      state.error = false
    })
    builder.addCase(getCourses.rejected, (state) => {
      state.loading = false
      state.courses = null
      state.error = true
    })
    builder.addCase(getStudents.pending, (state) => {
      state.loading = true
      state.students = null
      state.error = false
    })
    builder.addCase(getStudents.fulfilled, (state, action) => {
      state.loading = false
      state.students = action.payload.data
      state.error = false
    })
    builder.addCase(getStudents.rejected, (state) => {
      state.loading = false
      state.students = null
      state.error = true
    })
  },
})
const { reducer } = adminSlice
export default reducer
