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

// procedure.nameParse = (req, res, next) => {
//     const getName = res.locals.info
//     const parsed = {};
//     parsed.procedures = {};
//     for (let i = 0; i < getName.length; i ++) {
//         let date = "";
//         for (let j = 0; j < 11; j ++) {
//             date += getName[i].date[j]
//         }
//         if (Object.hasOwnProperty(parsed.procedures[getName[i].procedure])) {
//             const current = parsed.procedures[getName[i].procedure]
//             current.range = res.locals.quickMaths.range
//             current.avg = res.locals.avg
//             current.clicked = false;
//             current.entries.push({

//             })
//         } else {
//             parsed.procedures[getName[i].procedure] = {};
//             const current = parsed.procedures[getName[i].procedure]
//             current.range = res.locals.quickMaths.range
//             current.avg = res.locals.quickMaths.avg
//             current.clicked = false;
//             current.entries = [{
//                 "date": date,
//                 "insurance": insurance,
//                 "preInsurancecCost": pre_insurance,
//                 "outOfPocketCost": out_of_pocket,
//             }]
//         }
        
//     }

// }


module.exports = procedure