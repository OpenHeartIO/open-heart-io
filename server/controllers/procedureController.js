const db = require('../models/databaseModel.js')
const procedure = {}

procedure.createEntry = (req, res, next) => {
    console.log('in create entry')
    const {procedure, date, insurance, preinsuranceCost, oopCost} = req.body

    const query = `INSERT INTO megatable (procedure, date, insurance, pre_insurance, out_of_pocket)
    values($1, $2, $3, $4, $5)`

    db.query(query, [procedure, date, insurance, preinsuranceCost, oopCost])
    .then(()=> next())
    .catch((err)=> next(err))
}


procedure.getName = (req, res, next) => {
    // const location = req.query.searchLocation;
    // const location = req.params.id;
    const location = req.query.location;
    console.log('req.query', req.query)
    const query = `SELECT * FROM megatable WHERE location=$1`

    db.query(query, [location])
    .then((info) => {
        res.locals.info = info.rows;
        next()})
    .catch((err) => next(err))
}

//finding insurance pricing range and and calculate the average
procedure.getAverage = (req, res, next) => {
    // console.log('res.locals.info in getAverage',res.locals.info)

    const info = res.locals.info;
    
    //range 
    let outOfPocketMin = res.locals.info[0].out_of_pocket;
    let outOfPocketMax = res.locals.info[0].out_of_pocket;
    
    let preInsuranceMin = res.locals.info[0].pre_insurance;
    let preInsuranceMax = res.locals.info[0].pre_insurance;

    //average
    let outOfPocketTotal = 0;
    let outOfPocketCount = 0;
    let preInsuranceTotal = 0;
    let preInsuranceCount = 0;

    info.forEach((data) => {
        // console.log('data',data)
        outOfPocketTotal += data.out_of_pocket;
        outOfPocketCount += 1;
        
        
        //check for out of pocket range
        if (data.out_of_pocket < outOfPocketMin) {
            outOfPocketMin = data.out_of_pocket;
        } else if (data.out_of_pocket > outOfPocketMax) {
            outOfPocketMax = data.out_of_pocket;
        }
        
         //pre insurance avg
         preInsuranceTotal += data.pre_insurance;
         preInsuranceCount += 1;

        //check for pre_insurance range
        if (data.pre_insurance < preInsuranceMin) {
            preInsuranceMin = data.pre_insurance;
            // console.log('preInsuranceMin',preInsuranceMin)
        } else if (data.pre_insurance > preInsuranceMax) {
            preInsuranceMax = data.pre_insurance;
        }

    })

    let rangeOutOfPocket = [outOfPocketMin, outOfPocketMax];
    let avgOutOfPocket = outOfPocketTotal / outOfPocketCount;
    let rangePreInsurance = [preInsuranceMin, preInsuranceMax];
    let avgPreInsurance = preInsuranceTotal / preInsuranceCount;
    // console.log('rangeOutOfPocket', rangeOutOfPocket)
    // console.log('avgOutOfPocket', avgOutOfPocket)
    // console.log('rangePreInsurance', rangePreInsurance)
    // console.log('avgPreInsurance', avgPreInsurance)


    res.locals.quickMaths = {
        rangeOutOfPocket,
        avgOutOfPocket,
        rangePreInsurance,
        avgPreInsurance
    }

    // console.log('res.locals.quickMaths', res.locals.quickMaths)
    return next();
}


module.exports = procedure

