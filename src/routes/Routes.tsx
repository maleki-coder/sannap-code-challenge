import { Main , RegisterPhoneNumber} from "@/pages/index";
import {
    Layout,
} from "@components/index";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        element: (
            <Layout />
        ),
        children: [
            {
                path: "/register",
                element: <Main/>,
                children : [{
                    path : "registerPhoneNumber",
                    element : <RegisterPhoneNumber/>
                }]
            },
        ],
    }
]);
