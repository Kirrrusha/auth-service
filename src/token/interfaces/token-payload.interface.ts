export interface ITokenPayload {
    id: number
    status: string
    roles: string
}

export interface ITokenResponse {
    accessToken: string
    refreshToken: string
}
