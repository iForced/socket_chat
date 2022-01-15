import { MessageType } from './types'

export enum ChatActions {
    ADD_MESSAGE = 'CHAT/ADD_MESSAGE',
}
export enum ChatSagaActions {
    ADD_MESSAGE_REQUEST = 'CHAT@SAGA/ADD_MESSAGE_REQUEST',
}

// Reducer actions

export const addMessage = (message: MessageType) => {
    return {
        type: ChatActions.ADD_MESSAGE,
        payload: {
            message,
        }
    }
}

// Saga actions

export const addMessageRequest = (message: MessageType) => {
    return {
        type: ChatSagaActions.ADD_MESSAGE_REQUEST,
        payload: {
            message,
        }
    }
}