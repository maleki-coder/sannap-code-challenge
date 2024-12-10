import { Main , RegisterPhoneNumber} from "@/pages/index";
import {
    Layout,
} from "@components/index";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/register",
        element: <Main />,
        children: [
          {
            index: true, // This makes it the default sub-route for "/register"
            element: <Navigate to="phonenumber" replace />, // Redirect to "registerPhoneNumber"
          },
          {
            path: "phonenumber",
            element: <RegisterPhoneNumber />,
          },
        ],
      },
    ],
  },
]);
