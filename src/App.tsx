import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Products } from "./pages/products";
import { NewProduct } from "./pages/products/new";
import { EditProduct } from "./pages/products/edit";
import { RawMaterials } from "./pages/rawMaterials";
import { NewRawMaterials } from "./pages/rawMaterials/new";
import { EditRawMaterials } from "./pages/rawMaterials/edit";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/new",
        element: <NewProduct />,
      },
      {
        path: "/products/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "/rawMaterials",
        element: <RawMaterials />,
      },
      {
        path: "/rawMaterials/new",
        element: <NewRawMaterials />,
      },
      {
        path: "/rawMaterials/edit/:id",
        element: <EditRawMaterials />,
      },
    ],
  },
]);

export { router };
