const db = require('../models/databaseModel.js')
const procedure = {}

procedure.createEntry = (req, res, next) => {
    const {location, procedure, date, insurance, preinsuranceCost, oopCost} = req.body

    const query = `INSERT INTO megatable (location, procedure, date, insurance, pre_insurance, out_of_pocket)
    values($1, $2, $3, $4, $5, $6)`

    db.query(query, [location, procedure, date, insurance, preinsuranceCost, oopCost])
    .then(()=> next())
    .catch((err)=> next(err))
}


procedure.getName = (req, res, next) => {
    const location = req.params.id;
    
    const query = `SELECT * FROM megatable WHERE location=$1`

    db.query(query, [location])
    .then((info) => {
        res.locals.info = info.rows;
        next()})
    .catch((err) => next(err))
}

procedure.nameParse = (req, res, next) => {
    //the results of the search
    const getName = res.locals.info
    //new object to send back
    const parsed = {};
    //object of procedures
    parsed.procedures = {};
    //break apart information from search query for every entry in the search query
    for (let i = 0; i < getName.length; i ++) {
        let date = "";
        for (let j = 0; j < 11; j ++) {
            date += getName[i].date[j]
        }
        let { insurance, preinsuranceCost, oopCost } = getName[i]
        //check if there is a procedure that exists with the same name already
        if (parsed.procedures.hasOwnProperty(getName[i].procedure)) {
            let current = parsed.procedures[getName[i].procedure]
            current.range = res.locals.quickMaths.rangeOutOfPocket
            current.avg = res.locals.quickMaths.avgOutOfPocket
            current.clicked = false;
            current.entries.push({
                "date": date,
                "insruance": insurance,
                "preInsuranceCost": preinsuranceCost,
                "outOfPocketCost": oopCost,
            })
        } else {
            parsed.procedures[getName[i].procedure] = {};
            let current = parsed.procedures[getName[i].procedure]
            current.range = res.locals.quickMaths.rangeOutOfPocket
            current.avg = res.locals.quickMaths.avgOutOfPocket
            current.clicked = false;
            current.entries = [{
                "date": date,
                "insurance": insurance,
                "preInsurancecCost": preinsuranceCost,
                "outOfPocketCost": oopCost,
            }]
        }
    }
    res.locals.parsed = parsed;
    return next();
}


module.exports = procedure