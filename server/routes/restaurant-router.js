const express = require('express')

const EmpCtrl = require('../controllers/employee-ctrl')
const ItemCtrl = require('../controllers/item-ctrl')
const LoyaltyCtrl = require('../controllers/loyalty-ctrl')
const OrderCtrl = require('../controllers/order-ctrl')
const TableCtrl = require('../controllers/table-ctrl')

const router = express.Router()

//Employee Commands
router.post('/employee', EmpCtrl.createEmployee)
router.put('/employee/:id', EmpCtrl.updateEmployee)
router.delete('/employee/:id', EmpCtrl.deleteEmployee)
router.get('/employee/:id', EmpCtrl.getEmployeeById)
router.get('/employees', EmpCtrl.getEmployees)

//Item Commands
router.post('/item', ItemCtrl.createItem)
router.put('/item/:id', ItemCtrl.updateItem)
router.delete('/item/:id', ItemCtrl.deleteItem)
router.get('/item/:id', ItemCtrl.getItemById)
router.get('/items', ItemCtrl.getItems)
router.get('/items/avail', ItemCtrl.getAvailableItems)

//Loyalty Commands
router.post('/customer', LoyaltyCtrl.createCustomer)
router.put('/customer/:id', LoyaltyCtrl.updateCustomer)
router.delete('/customer/:id', LoyaltyCtrl.deleteCustomer)
router.get('/customer/:id', LoyaltyCtrl.getCustomerById)
router.get('/customers', LoyaltyCtrl.getCustomers)

//Order Commands
router.post('/order', OrderCtrl.createOrder)
router.put('/order/:id',OrderCtrl.updateOrder)
router.delete('/order/:id', OrderCtrl.deleteOrder)
router.get('/order/:id', OrderCtrl.getOrderById)
router.get('/orders', OrderCtrl.getOrders)

//Table Commands
router.post('/table',TableCtrl.createTable)
router.put('/table/:id',TableCtrl.updateTable)
router.get('/tables',TableCtrl.getTables)
router.get('/table/:id',TableCtrl.getTableByNum)



module.exports = router