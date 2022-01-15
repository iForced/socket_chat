import {takeEvery, call, put} from "@redux-saga/core/effects";
import { AuthSagaActions, checkMeRequest, loginRequest, registerRequest, setAuthorized, setUser } from './actions'
import { authAPI } from '../../api/authAPI'
import { decodeToken } from 'react-jwt'

export function * watchRegisterRequestSaga() {
    yield takeEvery(AuthSagaActions.REGISTER_REQUEST, registerRequestSaga)
}
export function * registerRequestSaga(action: ReturnType<typeof registerRequest>) {
    const {login, password} = action.payload
    yield call(authAPI.register, login, password)
}

export function * watchLoginRequestSaga() {
    yield takeEvery(AuthSagaActions.LOGIN_REQUEST, loginRequestSaga)
}
export function * loginRequestSaga(action: ReturnType<typeof loginRequest>) {
    const {login, password} = action.payload
    const response: {token: string} = yield call(authAPI.login, login, password)
    localStorage.setItem('tokenChat', response.token)
    const userData = decodeToken(response.token)
    // @ts-ignore
    yield put(setUser(userData.id, userData.login))
    yield put(setAuthorized(true))
}

export function * watchCheckMeRequestSaga() {
    yield takeEvery(AuthSagaActions.CHECK_ME_REQUEST, checkMeRequestSaga)
}
export function * checkMeRequestSaga(action: ReturnType<typeof checkMeRequest>) {
    const {token} = action.payload
    const response: {token: string} = yield call(authAPI.me, token)
    localStorage.setItem('tokenChat', response.token)
    const userData = decodeToken(response.token)
    // @ts-ignore
    yield put(setUser(userData.id, userData.login))
    yield put(setAuthorized(true))
}

export function * watchLogoutRequestSaga() {
    yield takeEvery(AuthSagaActions.LOGOUT_REQUEST, logoutRequestSaga)
}
export function * logoutRequestSaga() {
    localStorage.removeItem('tokenChat')
    yield put(setUser(null, null))
    yield put(setAuthorized(false))
}
