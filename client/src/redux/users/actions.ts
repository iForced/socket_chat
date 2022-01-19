import { UserType } from '../auth/types'

export enum UsersActions {
    SET_ALL_USERS = 'USERS/SET_ALL_USERS',
}

export enum UsersSagaActions {
    GET_ALL_USERS_REQUEST = 'USERS@SAGA/GET_ALL_USERS_REQUEST',
}

// Reducer actions

export const setAllUsers = (users: Array<UserType>) => {
    return {
        type: UsersActions.SET_ALL_USERS,
        payload: {
            users,
        }
    } as const
}

// Saga actions

export const getAllUsersRequest = () => {
    return {
        type: UsersSagaActions.GET_ALL_USERS_REQUEST,
    } as const
}
