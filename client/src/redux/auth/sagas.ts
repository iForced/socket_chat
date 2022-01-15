import {takeEvery, call, put} from "@redux-saga/core/effects";
import { AuthSagaActions, registerRequest } from './actions'
import { authAPI } from '../../api/authAPI'

export function * watchRegisterRequestSaga() {
    yield takeEvery(AuthSagaActions.REGISTER_REQUEST, registerRequestSaga)
}
export function * registerRequestSaga(action: ReturnType<typeof registerRequest>) {
    const {login, password} = action.payload
    yield call(authAPI.register, login, password)
}