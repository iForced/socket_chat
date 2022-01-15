import {all} from "@redux-saga/core/effects";
import { watchRegisterRequestSaga } from './auth/sagas'

export function * rootSaga () {
    yield all([
        watchRegisterRequestSaga(),
    ])
}