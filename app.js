const exp = require('express');
const fs = require('fs');
const app = exp();
// middleware
app.use(exp.json());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// console.log(tours);
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    length: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.post('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  res.status(200).json({
    status: 'success',
  });
});
const port = 3000;
app.listen(port, () => {
  console.log(`Listening to the ${port}`);
});
