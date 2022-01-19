import { axiosInstance } from './config'

export const messagesAPI = {

    async createConversation(senderId:string, receiverId: string) {
        const response = await axiosInstance.post('/conversations/add', {senderId, receiverId})
        return response.data
    },

    async addMessage(senderId: string, receiverId: string, conversationId: string, text: string) {
        const response = await axiosInstance.post('/messages/add', {senderId, receiverId, conversationId, text})
        return response.data
    },

    async getConversation(firstUser: string, secondUser: string) {
        const response = await axiosInstance.get(`/conversations/find/${firstUser}/${secondUser}`)
        return response.data
    },

    async getMessagesFromConversation(conversationId:  string) {
        const response = await axiosInstance.get(`/messages/${conversationId}`)
        return response.data
    }
}
