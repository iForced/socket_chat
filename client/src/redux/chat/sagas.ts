import { call, put, takeEvery } from '@redux-saga/core/effects'
import { addMessageRequest, ChatSagaActions } from './actions'
import { messagesAPI } from '../../api/messagesAPI'
import { MessageType } from './types'

export function * watchAddMessageRequestSaga() {
    yield takeEvery(ChatSagaActions.ADD_MESSAGE_REQUEST, addMessageRequestSaga)
}
export function * addMessageRequestSaga(action: ReturnType<typeof addMessageRequest>) {

}

export function * watchSetInitMessagesRequestSaga() {
    yield takeEvery(ChatSagaActions.SET_INIT_MESSAGES_REQUEST, setInitMessagesRequestSaga)
}
export function * setInitMessagesRequestSaga() {

}