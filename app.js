const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); //its a middleware for use =======>req.body

// app.get('/', (req, res) => {
//         res.status(200).json({message:'Welcome to my application', app: 'Natours'});
// })
// app.post('/', (req, res) => {res.send('you can post this to endpoints at https:// it is post request')});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
);
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});
app.post('/api/v1/tours', (req, res) => {
  //const tour = req.body;
 console.log(req.body);
 res.send('done');
  // tours.push(tour);
});  
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
