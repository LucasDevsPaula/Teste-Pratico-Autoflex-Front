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

interface MaterialItemPayload {
  codeRawMaterial: string;
  requiredQuantity: number;
}

interface CompositionPayload {
  codeProduct: string;
  materials: MaterialItemPayload[];
}

interface CreateProductData {
  code: string;
  name: string;
  price: number;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const res = await axios.get("http://localhost:3333/products");
  return res.data.products || res.data;
});

export const addProduct = createAsyncThunk(
  "products/add",
  async (newProduct: CreateProductData) => {
    const res = await axios.post("http://localhost:3333/products", newProduct);
    return res.data;
  },
);

export const addProductMaterial = createAsyncThunk(
  "products/addMaterial",
  async (data: CompositionPayload) => {
    console.log("ENVIANDO PARA O BACKEND:", JSON.stringify(data, null, 2));
    await axios.post("http://localhost:3333/product/composition", data);
    return;
  },
);

export const updateProductMaterial = createAsyncThunk(
  "products/updateMaterial",
  async (data: CompositionPayload) => {
    await axios.put("http://localhost:3333/product/composition", data);
    return;
  },
);


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
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao cadastrar produto";
      });
    builder
      .addCase(addProductMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductMaterial.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addProductMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Erro ao vincular material ao produto";
      });
    builder
      .addCase(updateProductMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductMaterial.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProductMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao cadastrar produto";
      });
  },
});

export default productsSlice.reducer;
