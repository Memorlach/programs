import { ProtectedRoute } from "@/routing/app-routing";
import { AppRouteGroup } from "@/routing/types/routes.types";
import OperatorPage from "@/pages/Operators/OperatorPage";
import  FormOperators  from "@/pages/Operators/FormOperators";

export const operatorsRoutes: AppRouteGroup = {
    routes: [
        {
            path: '/operators',
            element: <ProtectedRoute modulo="Operadores" action="util.mts.show" />,
            children: [
                {
                    index: true,
                    element: <OperatorPage />
                },
            ]
        },
        {
            path: '/formOperator',
            element: <ProtectedRoute modulo="Operadores" action="util.mts.show" />,
            children: [
                {
                    index: true,
                    element: <FormOperators title="Crear operador"
                                            onSubmit={(data) => {
                                                console.log("Datos enviados:", data);
                                            }}
                                            onCancel={() => {
                                                console.log("Cancelado");
                                            }} />
                },
            ]
        }
    ]
};
