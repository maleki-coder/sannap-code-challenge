import { Main } from "@/pages/index";
import { Layout } from "@components/index";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/register",
        element: <Main />,
      },
      {
        path: "*",
        element: <Navigate to="/register" replace />,
      },
    ],
  },
]);
