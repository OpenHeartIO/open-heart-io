const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const procedure = require('./controllers/procedureController.js')

// Body parser
app.use(express.json());

// Serve html
app.get('/', (req: JSON, res: { status: (arg0: number) => { (): any; new(): any; sendFile: { (arg0: any): void; new(): String; }; }; }) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// Serve build
app.use('/build', express.static(path.join(__dirname, '../build')));

//get location information
// app.get('/search/:id', procedure.getName, procedure.getAverage, (req, res) => {
//     res.status(200).send(res.locals.info)
// })

app.get('/search', procedure.getName, procedure.getAverage, procedure.nameParse, (req: JSON, res: { locals: { parsed: any; }; status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; send: (arg0: { msg: string; }) => void; }) => {
  // console.log('res.locals.parsed', res.locals.parsed)
  if (res.locals.parsed) {
    res.status(200).send(res.locals.parsed)
  } else {
    res.send({msg: 'failed'})
  }
})

// Handle post request from NewLocation & NewProcedure components
app.post('/create', procedure.createEntry, (req: JSON, res: { sendStatus: (arg0: number) => void; }) => {
  res.sendStatus(200)
})

//404 handler
app.use('*', (req: JSON, res: { sendStatus: (arg0: number) => void; }) => {
  res.sendStatus(404);
});
  
//global error handler
app.use((err: any, req: any, res: { sendStatus: (arg0: number) => void; }, next: any) => {
  // tslint:disable-next-line:no-console
  console.log(err);
  res.sendStatus(500);
});

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server listening on port: ${PORT}`);
});