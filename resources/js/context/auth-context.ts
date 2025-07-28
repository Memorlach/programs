import React, {createContext, useContext} from "react";
import {UserModel} from "@/lib/models";

export const AuthContext = createContext(<{
    auth?: UserModel;
    setAuth: React.Dispatch<React.SetStateAction<UserModel>>;
}>{
    setAuth: () => {},
});

export function useAuth() {
    return useContext(AuthContext);
}