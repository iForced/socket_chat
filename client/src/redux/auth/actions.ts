export enum AuthActions {
    SET_USER = 'AUTH/SET_USER',
    SET_AUTHORIZED = 'AUTH/SET_AUTHORIZED',
}
export enum AuthSagaActions {
    REGISTER_REQUEST = 'AUTH@SAGA/REGISTER_REQUEST',
}

// Reducer actions

export const setUser = (id: number, login: string) => {
    return {
        type: AuthActions.SET_USER,
        payload: {
            id,
            login,
        }
    } as const
}
export const setAuthorized = (isAuthorized: boolean) => {
    return {
        type: AuthActions.SET_AUTHORIZED,
        payload: {
            isAuthorized,
        }
    } as const
}

// Saga actions

export const registerRequest = () => {
    return {
        type: AuthSagaActions.REGISTER_REQUEST,
    }
}