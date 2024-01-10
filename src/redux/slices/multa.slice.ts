import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createMulta, getAllMultas } from "../api/multaAPI";

interface State {
  multas: Multa[];
  created?: Multa | null;
  isLoading: boolean;
  error?: string;
}

const initialState: State = {
  multas: [],
  created: null,
  isLoading: false,
};

export const getAllMultasAsync = createAsyncThunk("multa/getAll", async () => {
  try {
    const { data, error } = await getAllMultas();

    if (error) throw error;

    if (!data) throw new Error("Hubo un error en el servidor");

    const sortedData = data.sort((a: Multa, b: Multa) => {
      return b.iCodMulta - a.iCodMulta;
    });

    return { data: sortedData, error };
  } catch (err: any) {
    return { data: [], error: err };
  }
});

export const createMultaAsync = createAsyncThunk(
  "multa/create",
  async (multa: Multa, { rejectWithValue }) => {
    try {
      const { data, error } = await createMulta(multa);

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

const multaSlice = createSlice({
  name: "multa",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(getAllMultasAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllMultasAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.multas = action.payload.data;
    });

    // CREATE
    builder.addCase(createMultaAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createMultaAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    builder.addCase(createMultaAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.created = action.payload?.data;
      state.multas?.push(action.payload?.data);
    });
  },
});

export const multaReducer = multaSlice.reducer;
