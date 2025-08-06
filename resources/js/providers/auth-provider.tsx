import {useMemo, useState} from "react";
import {AuthContext} from "@/context/auth-context";
import {ModuleActions, RoleModule, UserModel} from "@/lib/models";

let token_user_bloqueos = '';

export function getTokenBloqueos(){
    return token_user_bloqueos;
}

export function AuthProvider({ user, children }: {user: any, children: React.ReactNode }) {
    const [auth, setAuth] = useState<UserModel>(user);

    console.log(user);

    const list_actions = useMemo(() => {
        let actions: any[] = [];

        auth.role.modules.forEach(module => {
            module.actions.forEach(action => {
                actions.push(action.action);
            });
        });

        return actions;
    }, [])

    const getAccessModule = (name_module : string) : RoleModule | undefined => {
        return auth.role.modules.find(module => module.name === name_module);
    };

    const getAccessAction = (name_action : string): ModuleActions | undefined => {
        return list_actions.find(action => action === name_action);
    };

    const checkAccess = (name_action : string): boolean => {
        return !!getAccessAction(name_action);
    }

    token_user_bloqueos = auth.token;

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                list_actions,
                getAccessModule,
                getAccessAction,
                checkAccess
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}