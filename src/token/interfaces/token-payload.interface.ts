export interface ITokenPayload {
    id: number
    status?: string
    role?: string
}

export interface ITokenResponse {
    accessToken: string
    refreshToken: string
}
