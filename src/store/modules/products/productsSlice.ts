import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface ProductMaterial {
  requiredQuantity: number;
  rawMaterial: {
    id: string;
    name: string;
    code: string;
  };
}

export interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  materials?: ProductMaterial[];
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const res = await axios.get("http://localhost:3333/products");
  return res.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao carregar produto";
      });
  },
});

export default productsSlice.reducer;
