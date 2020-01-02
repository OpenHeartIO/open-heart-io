const { Pool } = require('pg');

const pg_uri = 'postgres://jkpfqyts:4FIoC4u0mVRSyGuvvNhxGMBxNcfMUHjA@rajje.db.elephantsql.com:5432/jkpfqyts';

const pool = new Pool({
    connectionString: pg_uri
})

module.exports = { query: (text, params, callback) => {
    console.log('executed query');
    return pool.query(text, params, callback);
}}