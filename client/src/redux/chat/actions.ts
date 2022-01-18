import { MessageType } from './types'

export enum ChatActions {
    ADD_MESSAGE = 'CHAT/ADD_MESSAGE',
    SET_CURRENT_CONVERSATION = 'CHAT/SET_CURRENT_CONVERSATION',
    SET_INIT_MESSAGES_TO_CONVERSATION = 'CHAT/SET_INIT_MESSAGES_TO_CONVERSATION',
}

export enum ChatSagaActions {
    ADD_MESSAGE_REQUEST = 'CHAT@SAGA/ADD_MESSAGE_REQUEST',
    GET_INIT_MESSAGES_FROM_CONVERSATION_REQUEST = 'CHAT@SAGA/GET_INIT_MESSAGES_FROM_CONVERSATION_REQUEST',
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
export const setCurrentConversation = (conversationId: string) => {
    return {
        type: ChatActions.SET_CURRENT_CONVERSATION,
        payload: {
            conversationId,
        }
    } as const
}
export const getInitMessagesFromConversation = (conversationId: string) => {
    return {
        type: ChatActions.SET_INIT_MESSAGES_TO_CONVERSATION,
        payload: {
            conversationId,
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
export const getInitMessagesFromConversationRequest = () => {
    return {
        type: ChatSagaActions.GET_INIT_MESSAGES_FROM_CONVERSATION_REQUEST,
    }
}