// actions.ts
import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import { AuthData, logIn } from "../api/authAPI";
import { decodeToken } from "../../utils/authUtils";

interface UserData {
  exp: number;
  iCodEmpresa: number;
  iCodPerfil_: number;
  iCodUsuario: number;
  iat: number;
  vAliasUsuario: string;
  vDescripcionPerfil: string;
  vNombreEmpresa: string;
}

interface State {
  userData: UserData | null;
  accessToken: string | null;
  isLoading: boolean;
  error?: string;
}

const initialState: State = {
  userData: null,
  accessToken: null,
  isLoading: false,
};

export interface LoginProps {
  authData: AuthData;
  navigate: any;
}

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ authData, navigate }: LoginProps, { rejectWithValue }) => {
    try {
      const { data, error } = await logIn(authData);

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error("Ocurrió un error");
      }

      const accessToken = data.access_token;
      const userData = decodeToken(accessToken);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userData", JSON.stringify(userData));

      navigate("/ds/dashboard");

      return { accessToken, userData, error };
    } catch (err: any) {
      return rejectWithValue({ error: err.response.data.message, accessToken: null, userData: null });
    }
  }
);

export const logout = createAction("auth/logout");

export const initializeAuth = createAction("auth/initializeAuth");

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // LOGIN

    builder.addCase(loginAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.userData = action.payload.userData;
      state.isLoading = false;
    });

    // Maneja la acción de logout
    builder.addCase(logout, (state) => {
      state.userData = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
    });

    // Maneja la acción de inicializar la autenticación
    builder.addCase(initializeAuth, (state) => {
      state.userData = null;
    });
  },
});

export const authReducer = authSlice.reducer;
