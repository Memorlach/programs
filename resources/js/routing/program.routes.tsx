import { ProtectedRoute } from "@/routing/app-routing";
import { ListPrograms } from "@/pages/Programs/ListPrograms";
import { AppRouteGroup } from "@/routing/types/routes.types";
import {EditProgram} from "@/pages/Programs/EditProgram";

export const programsRoutes: AppRouteGroup = {
    routes: [
        {
            path: '/programs',
            element: <ProtectedRoute modulo="Programas" action="util.mts.show" />,
            children: [
                {
                    index: true,
                    element: <ListPrograms title="Listado de programas" />
                }, {
                    path: ':clv_program/edit',
                    element: <EditProgram title="Editar Programa" />
                }
            ]
        }
    ]
};