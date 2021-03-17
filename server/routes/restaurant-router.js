const express = require('express')

const EmpCtrl = require('../controllers/employee-ctrl')
const ItemCtrl = require('../controllers/item-ctrl')
const LoyaltyCtrl = require('../controllers/loyalty-ctrl')
const OrderCtrl = require('../controllers/order-ctrl')

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
router.get('/item/:avail', ItemCtrl.getAvailableItems)

//Loyalty Commands
router.post('/customer', LoyaltyCtrl.createCustomer)
router.put('/customer/:id', LoyaltyCtrl.updateCustomer)
router.delete('/customer/:id', LoyaltyCtrl.deleteCustomer)
router.get('/customer/:id', LoyaltyCtrl.getCustomerById)
router.get('/customers', LoyaltyCtrl.getCustomers)

//Order Commands
router.post('/order', OrderCtrl.createOrder)

module.exports = router