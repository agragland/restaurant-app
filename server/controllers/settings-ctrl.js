const Settings = require('../models/settings-model')

updateSettings = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Settings.findOne({_id: req.params.id}, (err, settings) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Settings not found!',
            })
        }
        settings.startTime = body.startTime
        settings.endTime = body.endTime
        settings
            .save()
            .then(() => {

                return res.status(200).json({
                    success: true,
                    id: item._id,
                    message: 'Settings updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Settings not updated!',
                })
            })
        })
}

getSettings = async (req, res) => {
    await Settings.find({}, (err, settings) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!settings.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: settings })
    }).catch(err => console.log(err))
}

module.exports = {
    updateSettings,
    getSettings,
}