const Customer = require('../models/loyalty-model')

createCustomer = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Customer',
        })
    }

    const customer = new Customer(body)


    if (!customer) {
        return res.status(400).json({ success: false, error: err })
    }

    customer
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: item._id,
                message: 'Customer created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Customer not created!',
            })
        })
}

updateCustomer = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Customer.findOne({ _id: req.params.id }, (err, customer) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Customer not found!',
            })
        }
        customer.name = body.name
        customer.email = body.email
        customer.phoneNumber = body.phoneNumber
        customer.rewards = body.rewards
        customer
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: customer._id,
                    message: 'Customer updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Customer not updated!',
                })
            })
    })
}

deleteCustomer = async (req, res) => {
    await Customer.findOneAndDelete({ _id: req.params.id }, (err, customer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!customer) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }

        return res.status(200).json({ success: true, data: customer })
    }).catch(err => console.log(err))
}

getCustomerById = async (req, res) => {
    await Customer.findOne({ _id: req.params.id }, (err, customer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!customer) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        return res.status(200).json({ success: true, data: customer })
    }).catch(err => console.log(err))
}

getCustomers = async (req, res) => {
    await Customer.find({}, (err, customers) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!customers.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: customers })
    }).catch(err => console.log(err))
}

module.exports = {
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomers,
    getCustomerById,
}