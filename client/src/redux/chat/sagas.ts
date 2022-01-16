import { call, put, takeEvery } from '@redux-saga/core/effects'
import { addMessageRequest, ChatSagaActions, setInitMessages } from './actions'
import { messagesAPI } from '../../api/messagesAPI'
import { MessageType } from './types'

export function * watchAddMessageRequestSaga() {
    yield takeEvery(ChatSagaActions.ADD_MESSAGE_REQUEST, addMessageRequestSaga)
}
export function * addMessageRequestSaga(action: ReturnType<typeof addMessageRequest>) {
    // const {message: {senderId, receiverId, text}} = action.payload
    // const addedMessage: MessageType = yield call(messagesAPI.addMessage, senderId, receiverId, text)
    // yield put(addMessage(addedMessage))
}

export function * watchSetInitMessagesRequestSaga() {
    yield takeEvery(ChatSagaActions.SET_INIT_MESSAGES_REQUEST, setInitMessagesRequestSaga)
}
export function * setInitMessagesRequestSaga() {
    const initMessages: {count: number, rows: Array<MessageType>} = yield call(messagesAPI.getAllMessages)
    yield put(setInitMessages(initMessages.rows))
}