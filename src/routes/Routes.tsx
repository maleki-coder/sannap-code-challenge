import { Main } from "@/pages/index";
import {
    Layout,
} from "@components/index";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        element: (
            // <ProtectedLayout>
            <Layout />
            //  </ProtectedLayout>
        ),
        children: [
            {
                path: "/main",
                element: <Main/>
            },
        ],
    }
]);
