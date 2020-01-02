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
        let stringed = `${getName[i].date}`
        console.log(stringed)
        for (let j = 0; j < 10; j ++) {
            date += stringed[j]
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

