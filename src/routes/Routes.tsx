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
import { RegistrationGuard } from "./RegistrationGaurd";

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
            element: (
              <RegistrationGuard stepIndex={1}>
                <PhoneNumber />
              </RegistrationGuard>
            ),
          },
          {
            path: "validateOtp",
            element: (
              <RegistrationGuard stepIndex={2}>
                <ValidateOtp />
              </RegistrationGuard>
            ),
          },
          {
            path: "fullname",
            element: (
              <RegistrationGuard stepIndex={3}>
                <FullName />
              </RegistrationGuard>
            ),
          },
          {
            path: "extraInfo",
            element: (
              <RegistrationGuard stepIndex={4}>
                <ExtraInfo />
              </RegistrationGuard>
            ),
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
