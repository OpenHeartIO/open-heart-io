const db = require('../models/databaseModel.js')
const procedure = {}

procedure.createEntry = (req, res, next) => {
    const {procedure, date, insurance, preinsuranceCost, oopCost} = req.body

    const query = `INSERT INTO megatable (procedure, date, insurance, pre_insurance, out_of_pocket)
    values($1, $2, $3, $4, $5)`

    db.query(query, [procedure, date, insurance, preinsuranceCost, oopCost])
    .then(()=> next())
    .catch((err)=> next(err))
}


procedure.getName = (req, res, next) => {
    // const location = req.query.searchLocation;
    const location = req.params.id;
    
    const query = `SELECT * FROM megatable WHERE location=$1`

    db.query(query, [location])
    .then((info) => {
        res.locals.info = info.rows[0];
        next()})
    .catch((err) => next(err))
}

//finding insurance pricing range and and calculate the average

procedure.getAverage = (req, res, next) => {
    //filtered by procedure- pre-insurance price 
    
    console.log('res.locals.info',res.locals.info)

    const category = req.params.id;
    
    const query = `SELECT * FROM megatable WHERE procedure=$1`

    db.query(query, [category])
    .then((resp) => {
        
        //pre-insurance
        let preInsurance = 0;
        let preInsuranceCount = 0;
        let outOfPocket = 0;
        let outOfPocketCount = 0;
        let tempPreIns = resp.rows[0].pre_insurance;
        let tempPocket = resp.rows[0].out_of_pocket;
        console.log('tempPreIns', tempPreIns)
        console.log('tempPocket', tempPocket)

        resp.rows.forEach((data) => {
            // console.log('data', data)

            //pre_insurance
            console.log('data.pre_insurance',data.pre_insurance)
            preInsurance += data.pre_insurance;
            preInsuranceCount += 1;
            if (data.pre_insurance < tempPreIns) {
                tempPreIns = data.preInsurance;
            }

            //out_of_pocket
            console.log('out_of_pocket', data.out_of_pocket)
            outOfPocket += data.out_of_pocket;
            outOfPocketCount += 1;
            if (data.out_of_pocket < tempPreIns) {
                tempPreIns = data.out_of_pocket;
            }
            // console.log('preInsurance', preInsurance)
            // console.log('outOfPocket', outOfPocket)
        })
        //average cost
        let avgPreInsurance = preInsurance / preInsuranceCount;
        let avgOutOfPocket = outOfPocket / outOfPocketCount;
        // console.log('avgPre',avgPreInsurance)
        // console.log('avgPoc',avgOutOfPocket)
        console.log('tempPreIns', tempPreIns)
        console.log('tempPocket', tempPocket)

        res.locals.quickMaths = {
            avgPreInsurance,
            avgOutOfPocket
        }

        next()})
    .catch((err) => next(err))
}


module.exports = procedure