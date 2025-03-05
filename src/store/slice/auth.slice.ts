import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user?: {
    id: string;
    name: string;
    email: string;
    roles: string[];
  };
  accessToken?: string;
  refreshToken?: string;
}

const initialState: AuthState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout(state) {
      state.user = undefined;
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
