import { MessageType } from './types'

export enum ChatActions {
    ADD_MESSAGE = 'CHAT/ADD_MESSAGE',
    SET_INIT_MESSAGES = 'CHAT/SET_INIT_MESSAGES',
    UPDATE_MESSAGES = 'CHAT/UPDATE_MESSAGES',
}

export enum ChatSagaActions {
    ADD_MESSAGE_REQUEST = 'CHAT@SAGA/ADD_MESSAGE_REQUEST',
    SET_INIT_MESSAGES_REQUEST = 'CHAT@SAGA/SET_INIT_MESSAGES_REQUEST',
}

// Reducer actions

export const addMessage = (message: MessageType) => {
    return {
        type: ChatActions.ADD_MESSAGE,
        payload: {
            message,
        }
    } as const
}
export const updateMessages = (messages: Array<MessageType>) => {
    return {
        type: ChatActions.UPDATE_MESSAGES,
        payload: {
            messages,
        }
    } as const
}
export const setInitMessages = (messages: Array<MessageType>) => {
    return {
        type: ChatActions.SET_INIT_MESSAGES,
        payload: {
            messages,
        }
    } as const
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
export const setInitMessagesRequest = () => {
    return {
        type: ChatSagaActions.SET_INIT_MESSAGES_REQUEST,
    }
}