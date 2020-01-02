const db = require('../models/databaseModel');
const procedure = {};
//Address table: create table Address (_id SERIAL, address VARCHAR(255), country CHAR(3), city VARCHAR(255), state CHAR(2), postal VARCHAR(5), PRIMARY KEY(_id))
//Operations table: create table Operations (_id serial, data date, insurance_provider varchar(255), pre_insurance_cost int, out_of_pocket_cost int)

db.query();

procedure.getName = (req, res, next) => {
    //location name === name that is sent
    const location = req.body.location;
    const query = `SELECT * FROM megatable where location=${location}`
    db.query(query, location => {
        if (err) {
            return next(err);
        } else {
            return next();
        }
    })
}