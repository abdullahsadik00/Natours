const exp = require('express');
const fs = require('fs');
const app = exp();
const morgan = require('morgan');
// Step 1) Middleware
app.use(exp.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  req.requesTime = new Date().toISOString();
  console.log('Hello middleware 👋');
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// console.log(tours);

// Step 2 Route Handlers
const getAllTours = (req, res) => {
  console.log(req.requesTime);
  res.status(200).json({
    status: 'success',
    length: tours.length,
    requestAt: req.requesTime,
    data: {
      tours,
    },
  });
};
const updateAllTours = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );
};
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invaid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invaid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: 'Data Updated',
  });
};
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invaid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', updateAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// Simple version of above code
// Routes
app.route('/api/v1/tours').get(getAllTours).post(updateAllTours);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// Server
const port = 3000;
app.listen(port, () => {
  console.log(`Listening to the ${port}`);
});
