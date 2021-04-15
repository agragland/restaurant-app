const Item = require ('../models/item-model')
const Change = require('../models/change-model')

createItem = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an item',
        })
    }

    const menu_item = new Item(body)

    if (!menu_item) {
        return res.status(400).json({ success: false, error: err })
    }

    menu_item
        .save()
        .then( () => {



            return res.status(201).json({
                success: true,
                id: menu_item._id,
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

updateItem = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Item.findOne({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Customer not found!',
            })
        }
        item.name = body.name
        item.category = body.category
        item.ingredients = body.ingredients
        item.price = body.price
        item.img = body.img
        item.isAvailable = body.isAvailable
        item
            .save()
            .then(() => {

                return res.status(200).json({
                    success: true,
                    id: item._id,
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

deleteItem = async (req, res) => {
    await Item.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!item) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }

        //UPDATE IN CHANGELOG

        return res.status(200).json({ success: true, data: item })
    }).catch(err => console.log(err))
}

getItemById = async (req, res) => {
    await Item.findOne({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!item) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: item })
    }).catch(err => console.log(err))
}

getItems = async (req, res) => {
    await Item.find({}, (err, items) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!items.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: items })
    }).catch(err => console.log(err))
}


getAvailableItems = async (req, res) => {
    await Item.find({isAvailable: true}, (err, items) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!items.length) {
            return res
                .status(404)
                .json({ success: false, error: `Item not found` })
        }
        return res.status(200).json({ success: true, data: items })

    }).catch(err => console.log(err))
}

module.exports = {
    createItem,
    updateItem,
    deleteItem,
    getItems,
    getItemById,
    getAvailableItems,
}