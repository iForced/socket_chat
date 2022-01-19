import { takeEvery } from '@redux-saga/core/effects'
import { addMessageRequest, ChatSagaActions, setCurrentConversationRequest } from './actions'

export function * watchSetCurrentConversationRequest() {
    yield takeEvery(ChatSagaActions.SET_CURRENT_CONVERSATION_REQUEST, setCurrentConversationRequestSaga)
}
export function * setCurrentConversationRequestSaga(action: ReturnType<typeof setCurrentConversationRequest>) {

}

export function * watchAddMessageRequestSaga() {
    yield takeEvery(ChatSagaActions.ADD_MESSAGE_REQUEST, addMessageRequestSaga)
}
export function * addMessageRequestSaga(action: ReturnType<typeof addMessageRequest>) {

}

export function * watchGetInitMessagesFromConversationRequest() {
    yield takeEvery(ChatSagaActions.GET_INIT_MESSAGES_FROM_CONVERSATION_REQUEST, getInitMessagesFromConversationRequestSaga)
}
export function * getInitMessagesFromConversationRequestSaga() {

}
