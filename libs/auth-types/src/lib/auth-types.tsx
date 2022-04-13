export interface ApplicationUserPublic {
    id: string,
    email: string,
    fullName: string,
    image: string
}

export interface ApplicationUserPrivate {
    roles: Array<string>
}

export interface AuthToken {
    token: string,
    expiresIn: number
}

export interface AuthResponse {
    authToken: AuthToken,
    refreshToken: AuthToken,
    tokenType: string,
    authState: ApplicationUserPrivate
}
