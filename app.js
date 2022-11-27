const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); //its a middleware for use =======>req.body
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
);

const createTour = (req, res) => {
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
};
const getAlltours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //multiply one for make it number;
  if (id > tours.length || !tours) {
    return res.status(404).json({ status: 'fail', message: 'invalid' });
  }

  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'invalid' });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<update toure here>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'invalid' });
  }
  res.status(204).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
};

// app.get('/api/v1/tours',getAlltours);
// app.post('/api/v1/tours', createTour);
app.get('/api/v1/tours/:id', getTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

//Alternative routes
app.route('/api/v1/tours').get(getAlltours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .patch(updateTour)
  .delete(deleteTour)
  .get(getTour);

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
