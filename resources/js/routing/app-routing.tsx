import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/layout/layout";
import Example from "@/pages/Example";
import {ListPrograms} from "@/pages/ListPrograms";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        //errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Example />,
            },
        ],
    },
    {
        path: '/programs',
        element: <Layout />,
        //errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <ListPrograms title="Listado de programas" />,
            },
        ],
    },
]);

export function AppRouting() {
    return (
        <RouterProvider router={router} />
    );
}
