import { setAuthorized, setUser } from './actions'

export type AuthInitialStateType = {
    user: UserType | null
    isAuthorized: boolean
}
export type UserType = {
    id: number | null
    login: string | null
}
export type AuthActionsType =
    ReturnType<typeof setUser>
    | ReturnType<typeof setAuthorized>