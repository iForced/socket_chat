import { axiosInstance } from './config'

export const usersAPI = {
    async getAll() {
        const response = await axiosInstance.get(`/users`)
        return response.data
    }
}
