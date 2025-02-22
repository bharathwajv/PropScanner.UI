import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { UserStorage } from "@/lib/UserStorage"

interface UserState {
  isLoggedIn: boolean
  user: any | null
}

const initialState: UserState = {
  isLoggedIn: UserStorage.isLoggedIn(),
  user: UserStorage.getUser(),
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true
      state.user = action.payload
      UserStorage.saveUser(action.payload)
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.user = null
      UserStorage.removeUser()
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer

