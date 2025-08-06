import React, {createContext, useContext} from "react";
import {ModuleActions, RoleModule, UserModel} from "@/lib/models";

export const AuthContext = createContext(<{
    auth?: UserModel | undefined;
    setAuth: React.Dispatch<React.SetStateAction<UserModel>>;
    list_actions: any[];
    getAccessModule (name_module: string) : RoleModule | undefined;
    getAccessAction (name_action: string) : ModuleActions | undefined;
    checkAccess(name_action: string): boolean;
}><unknown>{
    setAuth: () => {},
    getAccessModule: () => {},
    getAccessAction: () => {},
    checkAccess:() => {},
});

export function useAuth() {
    return useContext(AuthContext);
}