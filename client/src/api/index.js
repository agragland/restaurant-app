import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertItem = payload => api.post(`/item`, payload)
export const getAllItems = () => api.get(`/items`)
export const deleteItem = payload => api.delete(`/item/:id`, payload) //testing
export const insertCustomer = payload => api.post(`/customer`, payload)
export const checkEmployeeID = payload => api.get(`/employee.:id`, payload) //check id of employee trying to log in
//export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
//export const deleteMovieById = id => api.delete(`/movie/${id}`)
//export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    insertItem,
    getAllItems,
    deleteItem,
    insertCustomer,
    checkEmployeeID
}

export default apis