import { setAuthorized, setUser } from './actions'

export type AuthInitialStateType = {
    user: UserType | null
    isAuthorized: boolean
}
export type UserType = {
    id: string
    login: string
}
export type AuthActionsType =
    ReturnType<typeof setUser>
    | ReturnType<typeof setAuthorized>
