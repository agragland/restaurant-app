import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertItem = payload => api.post(`/item`, payload)
export const getAllItems = () => api.get(`/items`)
//export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
//export const deleteMovieById = id => api.delete(`/movie/${id}`)
//export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    insertItem,
    getAllItems,
}

export default apis