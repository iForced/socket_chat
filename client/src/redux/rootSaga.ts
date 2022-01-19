import {all} from "@redux-saga/core/effects";
import {
    watchCheckMeRequestSaga,
    watchLoginRequestSaga,
    watchLogoutRequestSaga,
    watchRegisterRequestSaga
} from './auth/sagas'
import { watchGetInitMessagesFromConversationRequest } from './chat/sagas'
import { watchGetAllUsersRequestSaga } from './users/sagas'

export function * rootSaga () {
    yield all([
        watchRegisterRequestSaga(),
        watchLoginRequestSaga(),
        watchCheckMeRequestSaga(),
        watchLogoutRequestSaga(),
        watchGetInitMessagesFromConversationRequest(),
        watchGetAllUsersRequestSaga(),
    ])
}
