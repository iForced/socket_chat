import { axiosInstance } from './config'

export const authAPI = {
    register(login: string, password: string) {
        return axiosInstance.post(`/auth/register`, {login, password})
    },

    login(login: string, password: string) {
        return axiosInstance.post(`/auth/login`, {login, password})
    },

    me(token: string) {
        return axiosInstance.get(`/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
    }
}