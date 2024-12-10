import {
    // SurveyList,
} from "@/pages/index";
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
                path: "/survey-list",
                element: <><div>sdfdsfs</div></>,
            },
        ],
    }
]);
