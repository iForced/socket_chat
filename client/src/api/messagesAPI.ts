import { axiosInstance } from './config'

export const messagesAPI = {
    async addMessage(senderId: number, receiverId: number, text: string) {
        const response = await axiosInstance.post(`/messages/add`, {senderId, receiverId, text})
        return response.data
    },

    async getAllMessages(page: number = 1, limit: number = 10) {
        const response = await axiosInstance.get(`/messages/?page=${page}&limit=${limit}`)
        return response.data
    },

    async getMessagesByUserId(userId: number) {
        const response = await axiosInstance.get(`/messages/${userId}`)
        return response.data
    }
}