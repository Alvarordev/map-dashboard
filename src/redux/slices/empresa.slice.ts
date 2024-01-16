import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createEmpresa,
  getAllEmpresas,
  updateEmpresa,
} from "../api/empresaAPI";

interface State {
  empresas: Empresa[];
  created: Empresa | null;
  updated: Empresa | null;
  isLoading: boolean;
  error?: string;
}

const initialState: State = {
  empresas: [],
  created: null,
  updated: null,
  isLoading: false,
};

export const getAllEmpresasAsync = createAsyncThunk(
  "empresa/getAll",
  async () => {
    try {
      const { data, error } = await getAllEmpresas();

      if (error) throw error;

      if (!data) throw new Error("Hubo un error en el servidor");

      return { data, error };
    } catch (err: any) {
      return { data: [], error: err };
    }
  }
);

export const createEmpresaAsync = createAsyncThunk(
  "empresa/create",
  async (empresa: Empresa, { rejectWithValue }) => {
    try {
      const { data, error } = await createEmpresa(empresa);

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

export const updateEmpresaAsync = createAsyncThunk(
  "empresa/update",
  async (empresa: Empresa, { rejectWithValue }) => {
    try {
      const { data, error } = await updateEmpresa(empresa);

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

const empresaSlice = createSlice({
  name: "empresa",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(getAllEmpresasAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllEmpresasAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.empresas = action.payload.data;
    });

    // CREATE
    builder.addCase(createEmpresaAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createEmpresaAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    builder.addCase(createEmpresaAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.created = action.payload.data;
      state.empresas.push(action.payload.data);
    });

    // UPDATE
    builder.addCase(updateEmpresaAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateEmpresaAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    builder.addCase(updateEmpresaAsync.fulfilled, (state, action) => {
      const updated = action.payload.data;
      const id = updated.iCodEmpresa;
      const index = state.empresas.findIndex((item) => item.iCodEmpresa === id);
      state.empresas[index] = updated;
      state.updated = updated;
      state.isLoading = false;
    });
  },
});

export const empresaReducer = empresaSlice.reducer;
