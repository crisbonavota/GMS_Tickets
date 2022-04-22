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
    }
}

export as namespace Config;