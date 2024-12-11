import {
  Main,
  PhoneNumber,
  ValidateOtp,
  FullName,
  ExtraInfo,
} from "@/pages/index";
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
            index: true,
            element: <Navigate to="phonenumber" replace />,
          },
          {
            path: "phonenumber",
            element: <PhoneNumber />,
          },
          {
            path: "validateOtp",
            element: <ValidateOtp />,
          },
          {
            path: "fullname",
            element: <FullName />,
          },
          {
            path: "extraInfo",
            element: <ExtraInfo />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/register" replace />,
      },
    ],
  },
]);
