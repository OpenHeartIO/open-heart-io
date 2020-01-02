const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// Body parser
app.use(express.json());

// Serve html
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// Serve build
app.use('/build', express.static(path.join(__dirname, '../build')));

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