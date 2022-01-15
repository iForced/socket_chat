import { setAllUsers } from './actions'
import { UserType } from '../auth/types'

export type UsersInitialStateType = {
    users: Array<UserType>
}
export type UsersActionsType =
    ReturnType<typeof setAllUsers>