const db = require('../models/databaseModel.js')
const procedure = {}

procedure.createEntry = (req, res, next) => {
    const procedure = req.body.procedure
    const date = req.body.date
    const insurance = req.body.insurance
    const preinsuranceCost = req.body.preinsuranceCost
    const oopCost = req.body.oopCost

    const query = `INSERT INTO megatable (procedure, date, insurance, preinsuranceCost, oopCost)
    values(${procedure}, ${date}, ${insurance}, ${preinsuranceCost}, ${oopCost})`

    db.query(query, (error, data) => {
        if (error) return next(error) 
        return next()
    })
}

module.exports = procedure