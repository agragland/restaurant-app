import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertItem = payload => api.post(`/item`, payload)
export const getAllItems = () => api.get(`/items`)
export const setMenuVariable = payload => api.put(`/item/:id`, payload)
export const deleteItem = payload => api.delete(`/item/:id`, payload)
export const insertCustomer = payload => api.post(`/customer`, payload)
//export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
//export const deleteMovieById = id => api.delete(`/movie/${id}`)
//export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    insertItem,
    getAllItems,
    setMenuVariable,
    deleteItem,
    insertCustomer
}

export default apis