import { addMessage, setInitMessages, updateMessages } from './actions'

export type ChatInitialStateType = {
    messages: Array<MessageType>
}
export type MessageType = {
    id: number
    senderId: number
    receiverId: number
    text: string
}
export type MessagesActionsType =
    ReturnType<typeof addMessage>
    | ReturnType<typeof setInitMessages>
    | ReturnType<typeof updateMessages>