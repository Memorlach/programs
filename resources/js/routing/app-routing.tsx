import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import { Layout } from "@/layout/layout";
import Example from "@/pages/Example";
import {ListPrograms} from "@/pages/Programs/ListPrograms";
import {useAuth} from "@/context/auth-context";
import React from "react";
import {dashboardRoutes} from "@/routing/dashboard.routes";
import {programsRoutes} from "@/routing/program.routes";
import {operatorsRoutes} from "@/routing/operator.routes";

export function ProtectedRoute ({modulo, action}:{modulo: string; action: string;}) {
    const user = useAuth();
    const access_module = user.getAccessModule(modulo);
    const access_action = user.getAccessAction(action);

    if(access_module !== undefined && access_action !== undefined){
        return <Layout />;
    }else{
        return <Navigate to="/unauthorized" replace />
    }
}

const router = createBrowserRouter([
    ...dashboardRoutes.routes,
    ...programsRoutes.routes,
    ...operatorsRoutes.routes,
]);

export function AppRouting() {
    return (
        <RouterProvider router={router} />
    );
}
