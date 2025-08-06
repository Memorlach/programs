import { RouteObject } from "react-router-dom";

export type AppRouteGroup = {
    path?: string;
    routes: RouteObject[];
};

export type ProgramRouteParams = {
    clv_program: string;
};