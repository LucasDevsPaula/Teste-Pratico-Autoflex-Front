import { initThemeMode } from "flowbite-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeInit } from "../.flowbite-react/init";
import {RouterProvider} from "react-router"
import "./index.css";
import { router } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeInit />
    <RouterProvider router={router}/>
  </StrictMode>,
);

initThemeMode();
