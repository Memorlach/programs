import { ProtectedRoute } from "@/routing/app-routing";
import { ListPrograms } from "@/pages/Programs/ListPrograms";
import { AppRouteGroup } from "@/routing/types/routes.types";
import {Layout} from "@/layout/layout";
import Example from "@/pages/Example";
import React from "react";

export const dashboardRoutes: AppRouteGroup = {
    routes: [
        {
            path: '/',
            element: <ProtectedRoute modulo="Escritorio" action="dashboard.index" />,
            children: [
                {
                    index: true,
                    element: <Example />,
                },
            ],
        }
    ]
};