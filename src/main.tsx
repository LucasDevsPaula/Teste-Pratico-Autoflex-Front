import { initThemeMode } from "flowbite-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeInit } from "../.flowbite-react/init";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./App";

import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeInit />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);

initThemeMode();
