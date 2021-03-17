const Order = require ('../models/order-model')
const Item = require('../models/item-model')

createOrder = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an item',
        })
    }

    const order = new Order(body)

    if (!order) {
        return res.status(400).json({ success: false, error: err })
    }

    order
        .save()
        .then( () => {
            return res.status(201).json({
                success: true,
                id: order._id,
                message: 'Item added!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Item not added!',
            })
        })

}

module.exports = {
    createOrder
}
