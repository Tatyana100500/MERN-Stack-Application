import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001',
})

export const insertAccount = payload => api.post(`/account`, payload)
export const getAllAccounts = () => api.get(`/people`)
export const updateAccountById = (id, payload) => api.put(`/account/${id}`, payload)
export const deleteAccountById = id => api.delete(`/account/${id}`)
export const getAccountById = id => api.get(`/account/${id}`)

const apis = {
    insertAccount,
    getAllAccounts,
    updateAccountById,
    deleteAccountById,
    getAccountById,
}

export default apis