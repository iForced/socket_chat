import { axiosInstance } from './config'

export const authAPI = {
    async register(login: string, password: string) {
        const response = await axiosInstance.post(`/auth/register`, {login, password})
        return response.data
    },

    async login(login: string, password: string) {
        const response = await axiosInstance.post(`/auth/login`, {login, password})
        return response.data
    },

    async me(token: string) {
        const response = await axiosInstance.get(`/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        return response.data
    }
}