const Employee = require('../models/employee-model')


createEmployee = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an item',
        })
    }

    const emp = new Employee(body)

    if (!emp) {
        return res.status(400).json({ success: false, error: err })
    }

    emp
        .save()
        .then( () => {
            return res.status(201).json({
                success: true,
                id: emp._id,
                message: 'Employee added!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Employee not added!',
            })
        })

}

updateEmployee = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Employee.findOne({ _id: req.params.id }, (err, employee) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Customer not found!',
            })
        }
        employee.name = body.name
        employee.role = body.role
        employee.password = body.password
        employee
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: employee._id,
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

deleteEmployee = async (req, res) => {
    await Employee.findOneAndDelete({_id: req.params.id}, (err, employee) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!employee.length) {
            return res
                .status(404)
                .json({success: false, error: `Employee not found`})
        }
        return res.status(200).json({success: true, data: employee})

    }).catch(err => console.log(err))
}


getEmployeeById = async (req, res) => {
    await Employee.findOne({_id: req.params.id}, (err, employee) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!employee.length) {
            return res
                .status(404)
                .json({ success: false, error: `Employee not found` })
        }
        return res.status(200).json({ success: true, data: employee })

    }).catch(err => console.log(err))
}

getEmployees = async (req, res) => {
    await Employee.find({}, (err, employees) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!employees.length) {
            return res
                .status(404)
                .json({ success: false, error: `Employee not found` })
        }
        return res.status(200).json({ success: true, data: employees })

    }).catch(err => console.log(err))
}

module.exports = {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployees,
    getEmployeeById,
}