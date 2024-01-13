import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type AuthData, logIn } from "../api/authAPI";
import { decodeToken, isValidToken } from "../../utils/authUtils";
import { NavigateFunction } from "react-router-dom";

export interface UserData {
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
  navigate: NavigateFunction;
}

export const initializeAuthAsync = createAsyncThunk(
  "auth/initializeAuth",
  async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      
      if (accessToken) {
        if (isValidToken(accessToken)) {
          const userData = decodeToken(accessToken);
          return { accessToken, userData };
        } else {
          throw new Error("El token ha expirado");
        }
      } else {
        throw new Error("No hay un accessToken");
      }
    } catch (err) {
      return { error: err, accessToken: null, userData: null };
    }
  }
);

export const setInitializeAuth = createAsyncThunk(
  "auth/setInitializeAuth",
  async (navigate: NavigateFunction, { dispatch }) => {
    try {
      await dispatch(logoutAsync(navigate));

      navigate('/login')

      return { success: true };
    } catch (error) {
      console.error("Error during setInitializeAuth:", error);
      throw error;
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ authData, navigate }: LoginProps, { rejectWithValue }) => {
    try {
      const { data, error } = await logIn(authData);

      if (error) throw error;

      if (!data) throw new Error("Ocurrió un error");

      const accessToken = data.access_token;
      const userData = decodeToken(accessToken);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userData", JSON.stringify(userData));

      navigate("/ds/dashboard");

      return { accessToken, userData };
    } catch (err: any) {
      return rejectWithValue({
        error: err.response.data.message,
        accessToken: null,
        userData: null,
      });
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (navigate: NavigateFunction) => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");

      navigate("/login");

      return { success: true };
    } catch (error) {
      // Manejar errores si es necesario
      console.error("Error during logout:", error);
      throw error;
    }
  }
);

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

    // LOGOUT
    builder.addCase(logoutAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(logoutAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.userData = null;
      state.isLoading = false;
    });

    // INITIALIZE AUTH
    builder.addCase(initializeAuthAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(initializeAuthAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(initializeAuthAsync.fulfilled, (state, action) => {
      state.userData = action.payload.userData;
      state.accessToken = action.payload.accessToken;
      state.isLoading = false;
    });

    // SET INITIALIZE AUTH
    builder.addCase(setInitializeAuth.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(setInitializeAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(setInitializeAuth.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const authReducer = authSlice.reducer;
