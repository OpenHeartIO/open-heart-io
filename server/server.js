const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const procedure = require('./controllers/procedureController.js')

// Body parser
app.use(express.json());

// Serve html
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// Serve build
app.use('/build', express.static(path.join(__dirname, '../build')));

//get location information
// app.get('/search/:id', procedure.getName, procedure.getAverage, (req, res) => {
//     res.status(200).send(res.locals.info)
// })

app.get('/search', procedure.getName, procedure.getAverage, procedure.nameParse, (req, res) => {
  if (res.locals.parsed) {
    res.status(200).send(res.locals.parsed)
  } else {
    res.sendStatus(400)
  }
})

// Handle post request from NewLocation & NewProcedure components
app.post('/create', procedure.createEntry, (req, res) => {
  res.sendStatus(200)
})

//404 handler
app.use('*', (req, res) => {
  res.sendStatus(404);
});
  
//global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});