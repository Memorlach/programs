import {useState} from "react";
import {AuthContext} from "@/context/auth-context";
import {UserModel} from "@/lib/models";

let token_user_bloqueos = '';

export function getTokenBloqueos(){
    return token_user_bloqueos;
}

export function AuthProvider({ user, children }: { user: any, children: React.ReactNode }) {
    const [auth, setAuth] = useState<UserModel>(user);

    token_user_bloqueos = auth.token;

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}