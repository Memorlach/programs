export interface UserModel{
    uid: string
    sso: string,
    first_name: string,
    last_name: string,
    email: string,
    avatar: string,
    account: string,
    active: boolean,
    role_uid: string,
    department: {
    uid: string,
        name: string
    },
    destination: {
        uid: string,
            name: string,
            description: string
    },
    role: {
        uid: string,
        name: string,
        description: string,
        access_level: number
        modules: [
            RoleModule
        ]
    },
    token: string
}

export interface RoleModule{
    name: string,
    route: string
    actions: [
        ModuleActions
    ]
}

export interface ModuleActions{
    action: string,
    description: string,
}