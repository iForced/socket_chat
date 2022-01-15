export enum AuthActions {
    SET_USER = 'AUTH/SET_USER',
    SET_AUTHORIZED = 'AUTH/SET_AUTHORIZED',
}
export enum AuthSagaActions {
    REGISTER_REQUEST = 'AUTH@SAGA/REGISTER_REQUEST',
    LOGIN_REQUEST = 'AUTH@SAGA/LOGIN_REQUEST',
    CHECK_ME_REQUEST = 'AUTH@SAGA/CHECK_ME_REQUEST',
    LOGOUT_REQUEST = 'AUTH@SAGA/LOGOUT_REQUEST',
}

// Reducer actions

export const setUser = (id: number | null, login: string | null) => {
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

export const registerRequest = (login: string, password: string) => {
    return {
        type: AuthSagaActions.REGISTER_REQUEST,
        payload: {
            login,
            password,
        }
    }
}
export const loginRequest = (login: string, password: string) => {
    return {
        type: AuthSagaActions.LOGIN_REQUEST,
        payload: {
            login,
            password,
        }
    }
}
export const checkMeRequest = (token: string) => {
    return {
        type: AuthSagaActions.CHECK_ME_REQUEST,
        payload: {
            token,
        }
    }
}
export const logoutRequest = () => {
    return {
        type: AuthSagaActions.LOGOUT_REQUEST,
    }
}