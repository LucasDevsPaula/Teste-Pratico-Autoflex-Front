import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./modules/products/productsSlice";
import rawMaterialsReducer from "./modules/rawMaterials/rawMaterialsSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    rawMaterials: rawMaterialsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
