import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, getAllUsers, updateUser } from "../api/userAPI";

interface State {
  usuarios: Usuario[];
  created: Usuario | null;
  updated: Usuario | null;
  isLoading: boolean;
  error?: string;
}

const initialState: State = {
  usuarios: [],
  created: null,
  updated: null,
  isLoading: false,
};

export const getAllUsuariosAsync = createAsyncThunk("usuario/getAll", async () => {
  try {
    const { data, error } = await getAllUsers();

    if (error) throw error;

    if (!data) throw new Error("Hubo un error en el servidor");

    return { data, error };
  } catch (err: any) {
    return { data: [], error: err };
  }
});

export const createUsuarioAsync = createAsyncThunk(
  "usuario/create",
  async (usuario: Usuario, { rejectWithValue }) => {
    try {
      const { data, error } = await createUser(usuario);

      if (error) throw error;

      if (!data) throw new Error("Hubo un error en el servidor");

      return { data, error };
    } catch (err: any) {
      return rejectWithValue({
        error: err.response.data.message,
        data: null,
      });
    }
  }
);

export const updateUsuarioAsync = createAsyncThunk(
  "usuario/update",
  async (usuario: Usuario, { rejectWithValue }) => {
    try {
      const { data, error } = await updateUser(usuario);

      if (error) throw error;

      if (!data) throw new Error("Hubo un error en el servidor");

      return { data, error };
    } catch (err: any) {
      return rejectWithValue({
        error: err.response.data.message,
        data: null,
      });
    }
  }
);

const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(getAllUsuariosAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllUsuariosAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usuarios = action.payload.data;
    });

    // CREATE
    builder.addCase(createUsuarioAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createUsuarioAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    builder.addCase(createUsuarioAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.created = action.payload.data;
      state.usuarios.push(action.payload.data);
    });

    // UPDATE
    builder.addCase(updateUsuarioAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateUsuarioAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    builder.addCase(updateUsuarioAsync.fulfilled, (state, action) => {
      const updated = action.payload.data;
      const id = updated.iCodUsuario;
      const index = state.usuarios.findIndex((item) => item.iCodUsuario === id);
      state.usuarios[index] = updated;
      state.updated = updated;
      state.isLoading = false;
    });
  },
});

export const userReducer = usuarioSlice.reducer;