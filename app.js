const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Tera bhai aaya 😁');
});
app.post('/', (req, res) => {
  res.json({ name: 'Sadik Shaikh', age: 23, position: 'MERN Developer' });
});
// app.post('/', (req, res) => {
//   res.send('You can post the response here');
// });
const port = 3000;
app.listen(port, () => {
  console.log(`Listening to the ${port}`);
});
