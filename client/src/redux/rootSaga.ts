import {all} from "@redux-saga/core/effects";
import {
    watchCheckMeRequestSaga,
    watchLoginRequestSaga,
    watchLogoutRequestSaga,
    watchRegisterRequestSaga
} from './auth/sagas'
import { watchAddMessageRequestSaga, watchSetInitMessagesRequestSaga } from './chat/sagas'

export function * rootSaga () {
    yield all([
        watchRegisterRequestSaga(),
        watchLoginRequestSaga(),
        watchCheckMeRequestSaga(),
        watchLogoutRequestSaga(),
        watchAddMessageRequestSaga(),
        watchSetInitMessagesRequestSaga(),
    ])
}