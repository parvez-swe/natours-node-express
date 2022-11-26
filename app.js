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

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  if (!tours || id > tours.length) {
    return res.status(404).json({ status: 'success', message: 'invalid' });
  }

  const id = req.params.id * 1; //multiply one for make it number;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTours = Object.assign({ id: newId }, req.body);
  tours.push(newTours);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTours,
        },
      });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
