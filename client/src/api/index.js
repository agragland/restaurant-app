import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertItem = payload => api.post(`/item`, payload)
export const getAllItems = () => api.get(`/items`)
export const getItemById = id => api.get(`/item/${id}`)
export const insertCustomer = payload => api.post(`/customer`, payload)
export const createOrder = payload => api.post(`/order`,payload)
export const getAllOrders = () => api.get(`/orders`)
export const updateOrder = (id, payload) => api.put(`/order/${id}`, payload)
export const deleteOrder = id => api.delete(`/order/${id}`)
export const getOrder = id => api.get(`/order/${id}`)
//export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
//export const deleteMovieById = id => api.delete(`/movie/${id}`)
//export const getMovieById = id => api.get(`/movie/${id}`)
export const updateTable = (table_num, payload) => api.put(`/table/${table_num}`,payload)

const apis = {
    insertItem,
    getAllItems,
    insertCustomer,
    getItemById,
    createOrder,
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder,
}

export default apis