import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface RawMaterial {
  id: string;
  name: string;
  code: string;
  stockyQuantity: number;
}

interface RawMaterialsState {
  items: RawMaterial[];
  loading: boolean;
  error: string | null;
}

const initialState: RawMaterialsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchRawMaterials = createAsyncThunk(
  "rawMaterials/fetchAll",
  async () => {
    const res = await axios.get("http://localhost:3333/rawMaterials");
    return res.data;
  },
);

const rawMaterialsSlice = createSlice({
  name: "rawMaterials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRawMaterials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRawMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRawMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao carregar matérias-prima";
      });
  },
});

export default rawMaterialsSlice.reducer;
