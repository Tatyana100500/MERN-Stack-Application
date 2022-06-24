import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001',
})

export const insertAccount = payload => api.post(`/`, payload)
export const logIn = payload => api.post(`/login`, payload)
export const getAllAccounts = () => api.get(`/people`)
export const updateAccountById = (id, payload) => api.put(`/account/${id}`, payload)
export const deleteAccountById = id => api.delete(`/account/${id}`)
export const getAccountById = id => api.get(`/account/${id}`)

const apis = {
    insertAccount,
	logIn,
    getAllAccounts,
    updateAccountById,
    deleteAccountById,
    getAccountById,
}

export default apis