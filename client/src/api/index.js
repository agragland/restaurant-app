import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertItem = payload => api.post(`/item`, payload)
export const getAllItems = () => api.get(`/items`)
export const getItemById = id => api.get(`/item/${id}`)
export const insertCustomer = payload => api.post(`/customer`, payload)
export const createOrder = payload => api.post(`/order`,payload)
//export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
//export const deleteMovieById = id => api.delete(`/movie/${id}`)
//export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    insertItem,
    getAllItems,
    insertCustomer,
    getItemById,
    createOrder
}

export default apis