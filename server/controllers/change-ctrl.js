const Change = require('../models/change-model')

createChange = async(req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an item',
        })
    }

    const change = new Change(body)

    if (!change) {
        return res.status(400).json({ success: false, error: err })
    }

    change
        .save()
        .then( () => {
            return res.status(201).json({
                success: true,
                id: change._id,
                message: 'Item added!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Item not added!',
            })
        });
}

getChanges = async(req, res) => {
    await Change
        .find({})
        .populate('emp')
        .exec((err, changes) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!changes.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Employee not found` })
            }
            return res.status(200).json({ success: true, data: changes })
        });
}

module.exports = {
    createChange,
    getChanges
}