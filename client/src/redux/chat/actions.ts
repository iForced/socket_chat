import { MessageType } from './types'

export enum ChatActions {
    ADD_MESSAGE = 'CHAT/ADD_MESSAGE',
    SET_CURRENT_CONVERSATION = 'CHAT/SET_CURRENT_CONVERSATION',
    SET_INIT_MESSAGES_FOR_CONVERSATION = 'CHAT/SET_INIT_MESSAGES_FOR_CONVERSATION',
}

export enum ChatSagaActions {
    ADD_MESSAGE_REQUEST = 'CHAT@SAGA/ADD_MESSAGE_REQUEST',
    SET_CURRENT_CONVERSATION_REQUEST = 'CHAT@SAGA/SET_CURRENT_CONVERSATION_REQUEST',
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
export const setInitMessagesForConversation = (messages: Array<MessageType>) => {
    return {
        type: ChatActions.SET_INIT_MESSAGES_FOR_CONVERSATION,
        payload: {
            messages,
        }
    } as const
}

// Saga actions

export const addMessageRequest = (senderId: string, receiverId: string, text: string) => {
    return {
        type: ChatSagaActions.ADD_MESSAGE_REQUEST,
        payload: {
            senderId,
            receiverId,
            text,
        }
    }
}
export const setCurrentConversationRequest = (senderId: string, receiverId: string) => {
    return {
        type: ChatSagaActions.SET_CURRENT_CONVERSATION_REQUEST,
        payload: {
            senderId,
            receiverId,
        }
    }
}
