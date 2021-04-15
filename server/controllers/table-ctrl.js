const Table = require ('../models/table-model')


createTable = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an item',
        })
    }

    const table = new Table(body)

    if (!table) {
        return res.status(400).json({ success: false, error: err })
    }

    table
        .save()
        .then( () => {
            return res.status(201).json({
                success: true,
                id: table._id,
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

updateTable = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Table.findOne({ table_num: req.params.id }, (err, table) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Table not found!',
            })
        }
        table.table_num = body.table_num
        table.status = body.status
        table.refills = body.refills
        table.assistance = body.assistance
        table
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: table._id,
                    message: 'Table updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Table not updated!',
                })
            })
    })
}

getTables = async (req, res) => {
    await Table.find({}, (err, tables) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!tables.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: tables })
    }).catch(err => console.log(err))
}

getTableByNum = async (req, res) => {
    await Table.findOne({table_num: req.params.id}, (err, table) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!table) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: table })
    }).catch(err => console.log(err))
    }

module.exports = {
    createTable,
    updateTable,
    getTables,
    getTableByNum
}