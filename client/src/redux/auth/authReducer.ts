import { AuthActionsType, AuthInitialStateType } from './types'
import { AuthActions } from './actions'

const initialState: AuthInitialStateType = {
    user: null,
    isAuthorized: false,
}

export const authReducer = (state: AuthInitialStateType = initialState, action: AuthActionsType): AuthInitialStateType => {
    switch (action.type) {

        case AuthActions.SET_USER:
            return {
                ...state,
                user: action.payload.user
            }

        case AuthActions.SET_AUTHORIZED:
            return {
                ...state,
                isAuthorized: action.payload.isAuthorized,
            }

        default:
            return state
    }
}