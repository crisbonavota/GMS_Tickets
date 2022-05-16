export interface IConfig {
    apps: Array<App>
}

export interface App {
    name: string,
    path: string,
    devPort: number,
    serveOn: {
        production: boolean,
        development: boolean
    },
    allowedRoles?: Array<string>,
    module?: string,
    label: string,
    description?: string,
    image?: string,
    requireAuth: boolean
}

export as namespace Config;