export type ChatInitialStateType = {
    messages: Array<MessageType>
}
export type MessageType = {
    id: number
    senderId: number
    receiverId: number
    text: string
}