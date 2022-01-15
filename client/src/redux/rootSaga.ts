import {all} from "@redux-saga/core/effects";
import { watchLoginRequestSaga, watchRegisterRequestSaga } from './auth/sagas'

export function * rootSaga () {
    yield all([
        watchRegisterRequestSaga(),
        watchLoginRequestSaga(),
    ])
}