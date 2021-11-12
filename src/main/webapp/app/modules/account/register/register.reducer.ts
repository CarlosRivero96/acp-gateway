import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: false,
  registrationSuccess: false,
  registrationFailure: false,
  errorMessage: null,
  successMessage: null,
};

export type RegisterState = Readonly<typeof initialState>;

// Actions

export const handleRegister = createAsyncThunk(
  'register/create_account',
  async (data: { login: string; firstName: string; lastName: string; email: string; password: string; langKey?: string }) => {
    // Post auth service
    await axios
      .post<any>('api/register', {
        login: data.login.toLowerCase,
        email: data.email,
        password: data.password,
        langKey: data.langKey,
      })
      .then(response =>
        // Post api service
        axios
          .post<any>('services/api/api/user-data/register', {
            login: data.login.toLowerCase,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          })
          .then(response2 =>
            // Activate in auth service
            axios.get<any>(`api/activate/?key=${data.login.split('@')[0]}`)
          )
      );
  },
  { serializeError: serializeAxiosError }
);

export const RegisterSlice = createSlice({
  name: 'register',
  initialState: initialState as RegisterState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(handleRegister.pending, state => {
        state.loading = true;
      })
      .addCase(handleRegister.rejected, (state, action) => ({
        ...initialState,
        registrationFailure: true,
        errorMessage: action.error.message,
      }))
      .addCase(handleRegister.fulfilled, () => ({
        ...initialState,
        registrationSuccess: true,
        successMessage: 'register.messages.success',
      }));
  },
});

export const { reset } = RegisterSlice.actions;

// Reducer
export default RegisterSlice.reducer;
