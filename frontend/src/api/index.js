import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001',
})

export const insertAccount = payload => api.post(`/`, payload)
export const logIn = payload => api.post(`/login`, payload)
export const getAllAccounts = () => api.get(`/people`)
export const updateAccountById = (id, payload) => api.put(`/account/update/${id}`, payload)
export const getAccountById = id => api.get(`/account/${id}`)
export const getCurrentAccount = id => api.get(`/account/${id}`)

const apis = {
    insertAccount,
	logIn,
    getAllAccounts,
    updateAccountById,
    getAccountById,
	getCurrentAccount,
}

export default apis