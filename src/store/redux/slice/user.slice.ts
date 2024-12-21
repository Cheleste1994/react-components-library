import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MOCK_USER_DATA } from '@/constants/mockData';
import { Theme, getInitialTheme } from '@/store/contexts/ThemeContext';
import { User, UserLanguage, UserRoleEnum } from '@/types/user';

import { RootState } from '../store';

export interface UserState {
  isLogin: boolean;
  isLoading: boolean;
  user: User | null;
  isUserRole: boolean;
  isAdminRole: boolean;
  isManagerRole: boolean;
  language: UserLanguage;
  theme: Theme;
}

const language = localStorage.getItem('language');

export const initialState: UserState = {
  isLoading: true,
  isLogin: false,
  user: null,
  isUserRole: false,
  isAdminRole: false,
  isManagerRole: false,
  language: language ? (language as UserLanguage) : 'RU',
  theme: getInitialTheme(),
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (role?: UserRoleEnum): Promise<User | null> => {
    const user = MOCK_USER_DATA;
    return role ? { ...user, roles: [role] } : user;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async (): Promise<null> => {
  const user = null;
  return user;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLanguage(state, action: { payload: UserLanguage }) {
      state.language = action.payload;
    },
    setTheme(state, action: { payload: Theme }) {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isLogin = Boolean(payload);
      state.user = payload;
      state.isLoading = false;
      state.isUserRole = Boolean(payload?.roles?.some((e) => e === UserRoleEnum.User));
      state.isManagerRole = Boolean(payload?.roles?.some((e) => e === UserRoleEnum.Manager));
      state.isAdminRole = Boolean(payload?.roles?.some((e) => e === UserRoleEnum.Admin));
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logoutUser.fulfilled, (state, { payload }) => {
      state.isLogin = Boolean(payload);
      state.user = payload;
      state.isLoading = false;
      state.isUserRole = false;
      state.isManagerRole = false;
      state.isAdminRole = false;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const getUser = (state: RootState) => state.userReducer;
export const getLanguage = (state: RootState) => state.userReducer.language;

export const { setLanguage, setTheme } = userSlice.actions;

export default userSlice.reducer;
