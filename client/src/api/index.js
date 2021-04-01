import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertItem = payload => api.post(`/item`, payload)
export const getAllItems = () => api.get(`/items`)
export const updateItem = (id, payload) => api.put(`/item/:${id}`, payload) //update item
export const deleteItem = id => api.delete(`/item/:${id}`) //delete item
export const insertCustomer = payload => api.post(`/customer`, payload)
export const checkEmployeeID = id => api.get(`/employee/:${id}`) //check id of employee trying to log in
//export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
//export const deleteMovieById = id => api.delete(`/movie/${id}`)
//export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    insertItem,
    getAllItems,
    updateItem,
    deleteItem,
    insertCustomer,
    checkEmployeeID
}

export default apis