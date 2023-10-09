const express = require('express');
const fs = require('fs');
const app = express();

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
// app.post('/', (req, res) => {
//   res.json({ name: 'Sadik Shaikh', age: 23, position: 'MERN Developer' });
// });
// app.post('/', (req, res) => {
//   res.send('You can post the response here');
// });
const port = 3000;
app.listen(port, () => {
  console.log(`Listening to the ${port}`);
});
