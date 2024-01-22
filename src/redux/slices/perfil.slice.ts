import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPerfil, getAllPerfil, updatePerfil } from "../api/perfilAPI";

interface State {
  perfil: Perfil[];
  created: Perfil | null;
  updated: Perfil | null;
  isLoading: boolean;
  error?: string;
}

const initialState: State = {
  perfil: [],
  created: null,
  updated: null,
  isLoading: false,
};

export const getAllPerfilesAsync = createAsyncThunk("perfil/getAll", async () => {
  try {
    const { data, error } = await getAllPerfil();

    if (error) throw error;

    if (!data) throw new Error("Hubo un error en el servidor");

    return { data, error };
  } catch (err: any) {
    return { data: [], error: err };
  }
});

export const createPerfilAsync = createAsyncThunk(
  "perfil/create",
  async (perfil: Perfil, { rejectWithValue }) => {
    try {
      const { data, error } = await createPerfil(perfil);

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

export const updatePerfilAsync = createAsyncThunk(
  "perfil/update",
  async (perfil: Perfil, { rejectWithValue }) => {
    try {
      const { data, error } = await updatePerfil(perfil);

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

const perfilSlice = createSlice({
  name: "perfil",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(getAllPerfilesAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllPerfilesAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.perfil = action.payload.data;
    });

    // CREATE
    builder.addCase(createPerfilAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createPerfilAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    builder.addCase(createPerfilAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.created = action.payload.data;
      state.perfil.push(action.payload.data);
    });

    // UPDATE
    builder.addCase(updatePerfilAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updatePerfilAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    builder.addCase(updatePerfilAsync.fulfilled, (state, action) => {
      const updated = action.payload.data;
      const id = updated.iCodPerfil;
      const index = state.perfil.findIndex((item) => item.iCodPerfil === id);
      state.perfil[index] = updated;
      state.updated = updated;
      state.isLoading = false;
    });
  },
});

export const perfilReducer = perfilSlice.reducer;
