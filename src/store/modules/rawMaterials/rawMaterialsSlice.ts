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

interface CreateRawMaterials {
  code: string;
  name: string;
  stockyQuantity: number;
}

interface UpdateRawMaterialPayload {
  id: string;
  name: string;
  stockyQuantity: number;
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
    return res.data.rawMaterials || res.data;
  },
);

export const addRawMaterial = createAsyncThunk(
  "rawMaterials/add",
  async (newRawMaterial: CreateRawMaterials) => {
    const res = await axios.post(
      "http://localhost:3333/rawMaterials",
      newRawMaterial,
    );
    return res.data;
  },
);

export const updateRawMaterial = createAsyncThunk(
  "rawMaterials/update",
  async (data: UpdateRawMaterialPayload) => {
    await axios.put(`http://localhost:3333/rawMaterials/${data.id}`, {
      name: data.name,
      stockyQuantity: data.stockyQuantity,
    });
    return;
  }
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

    builder
      .addCase(addRawMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRawMaterial.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addRawMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao cadastrar produto";
      });

      builder
      .addCase(updateRawMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRawMaterial.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateRawMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao atualizar insumo";
      });
  },
});

export default rawMaterialsSlice.reducer;
