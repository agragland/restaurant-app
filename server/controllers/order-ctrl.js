const Order = require ('../models/order-model')

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

updateOrder = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Order.findOne({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Customer not found!',
            })
        }
        order.order_items = body.order_items
        order.comments = body.comments
        order.subtotal = body.subtotal
        order.tip = body.tip
        order.total = body.total
        order.status = body.status
        order.table = body.table
        order
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: order._id,
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

deleteOrder = async (req, res) => {
    await Order
        .findOneAndDelete({ _id: req.params.id })
        .exec(
            function(err, order)
            {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }

                if (!order) {
                    return res
                        .status(404)
                        .json({ success: false, error: `Customer not found` })
                }
                return res.status(200).json({ success: true, data: order })
            });
}

getOrderById = async (req, res) => {
    await Order
        .findOne({ _id: req.params.id })
        .populate('order_items')
        .exec(
            function(err, order)
            {
            if (err) {
                return res.status(400).json({ success: false, error: err })
                }

            if (!order) {
                return res
                    .status(404)
                    .json({ success: false, error: `Customer not found` })
            }
            return res.status(200).json({ success: true, data: order })
        });
}

getOrders = async (req, res) => {
    await Order
        .find({})
        .populate('order_items')
        .exec(function(err, employees)
        {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!employees.length) {
            return res
                .status(404)
                .json({ success: false, error: `Employee not found` })
        }
        return res.status(200).json({ success: true, data: employees })

    });
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    getOrders
}
