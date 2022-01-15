import { UsersActionsType, UsersInitialStateType } from './types'
import { UsersActions } from './actions'

const initialState: UsersInitialStateType = {
    users: [],
}

export const usersReducer = (state: UsersInitialStateType = initialState, action: UsersActionsType): UsersInitialStateType => {
    switch (action.type) {

        case UsersActions.SET_ALL_USERS:
            return {
                ...state,
                users: action.payload.users,
            }

        default:
            return state
    }
}