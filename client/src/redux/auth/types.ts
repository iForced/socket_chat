import { setAuthorized, setUser } from './actions'

export type AuthInitialStateType = {
    id: number | null
    login: string | null
    isAuthorized: boolean
}
export type AuthActionsType =
    ReturnType<typeof setUser>
    | ReturnType<typeof setAuthorized>