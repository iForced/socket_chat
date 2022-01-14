import { axiosInstance } from './config'

export const messagesAPI = {
    addMessage(senderId: number, receiverId: number, text: string) {
        return axiosInstance.post(`/add`, {senderId, receiverId, text})
    },

    getAllMessages(page: number = 1, limit: number = 10) {
        return axiosInstance.get(`/?page=${page}&limit=${limit}`)
    },

    getMessagesByUserId(userId: number) {
        return axiosInstance.get(`/${userId}`)
    }
}