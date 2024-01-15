import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCepo, getAllCepos, updateCepo } from "../api/tipoCepoAPI";

interface State {
  cepos: Tipocepo[];
  created: Tipocepo | null;
  updated: Tipocepo | null;
  isLoading: boolean;
  error?: string;
}

const initialState: State = {
  cepos: [],
  created: null,
  updated: null,
  isLoading: false,
};

export const getAllCeposAsync = createAsyncThunk("cepo/getAll", async () => {
  try {
    const { data, error } = await getAllCepos();

    if (error) throw error;

    if (!data) throw new Error("Hubo un error en el servidor");

    return { data, error };
  } catch (err: any) {
    return { data: [], error: err };
  }
});

export const createCepoAsync = createAsyncThunk(
  "cepo/create",
  async (cepo: Tipocepo, { rejectWithValue }) => {
    try {
      const { data, error } = await createCepo(cepo);

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

export const updateCepoAsync = createAsyncThunk(
  "cepo/update",
  async (cepo: Tipocepo, { rejectWithValue }) => {
    try {
      const { data, error } = await updateCepo(cepo);

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

const cepoSlice = createSlice({
  name: "cepo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(getAllCeposAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllCeposAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cepos = action.payload.data;
    });

    // CREATE
    builder.addCase(createCepoAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createCepoAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    builder.addCase(createCepoAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.created = action.payload.data;
      state.cepos.push(action.payload.data);
    });

    // UPDATE
    builder.addCase(updateCepoAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateCepoAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    builder.addCase(updateCepoAsync.fulfilled, (state, action) => {
      const updated = action.payload.data;
      const id = updated.iCodTipoCepo;
      const index = state.cepos.findIndex(item => item.iCodTipoCepo === id);
      state.cepos[index] = updated
      state.updated = updated;
      state.isLoading = false;
    });
  },
});

export const cepoReducer = cepoSlice.reducer;
