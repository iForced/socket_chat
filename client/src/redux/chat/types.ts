import {
    addMessage,
    setCurrentConversation,
    setInitMessagesForConversation
} from './actions'

export type ChatInitialStateType = {
    currentConversation: string
    messages: Array<MessageType>
}
export type MessageType = {
    id: string
    senderId: string
    receiverId: string
    text: string
}
export type MessagesActionsType =
    ReturnType<typeof addMessage>
    | ReturnType<typeof setCurrentConversation>
    | ReturnType<typeof setInitMessagesForConversation>
