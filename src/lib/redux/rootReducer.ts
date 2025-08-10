/* Instruments */
import { combineReducers } from "@reduxjs/toolkit"
import signupReducer from "./features/signup/signupSlice"
import authReducer from "./features/auth/authSlice"
import studentReducer from "./features/student/studentSlice"
import adminReducer from "./features/admin/adminSlice"
import parentReducer from "./features/parent/parentSlice"
import profileReducer from "./features/profile/profileSlice"

export const reducer = combineReducers({
  signup: signupReducer,
  auth: authReducer,
  student: studentReducer,
  admin: adminReducer,
  parent: parentReducer,
  profile: profileReducer,
})
