export interface ApplicationUserPublic {
    id: number;
    email: string;
    fullName: string;
    image: string;
}

export interface ApplicationUserPrivate extends ApplicationUserPublic {
    roles: Array<string>;
}

export interface AuthToken {
    token: string;
    expiresIn: number;
}

export interface AuthResponse {
    authToken: AuthToken;
    refreshToken: AuthToken;
    tokenType: string;
    authState: ApplicationUserPrivate;
}

export interface LegacyUserPublic {
    id: number;
    email: string;
    fullName: string;
    fileNumber: number;
}
