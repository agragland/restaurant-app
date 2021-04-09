import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

//item
export const insertItem = payload => api.post(`/item`, payload)
export const getAllItems = () => api.get(`/items`)
export const getItemById = id => api.get(`/item/${id}`)
export const updateItem = (id, payload) => api.put(`/item/:${id}`, payload) //update item
export const deleteItem = id => api.delete(`/item/:${id}`) //delete item
//customer
export const insertCustomer = payload => api.post(`/customer`, payload)
export const getAllCustomers = () => api.get(`/customers`)
//employee
export const getEmployees = () => api.get(`/employees`) //check id of employee trying to log in
//order
export const createOrder = payload => api.post(`/order`,payload)
export const getAllOrders = () => api.get(`/orders`)
export const updateOrder = (id, payload) => api.put(`/order/${id}`, payload)
export const deleteOrder = id => api.delete(`/order/${id}`)
export const getOrder = id => api.get(`/order/${id}`)
//table
export const updateTable = (table_num, payload) => api.put(`/table/${table_num}`,payload)
export const getTables = () => api.get(`/tables`)
export const getTableByNum = (table_num) => api.get(`/table/${table_num}`)



const apis = {
    insertItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
    insertCustomer,
    getAllCustomers,
    getEmployees,
    createOrder,
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder,
    updateTable,
    getTables,
    getTableByNum,
}

export default apis