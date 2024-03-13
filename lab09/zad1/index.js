const express = require('express');
const app = express();
const port = 3000;

let data = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' }
];

app.use(express.json());

app.get('/api', (req, res) => {
  res.json(data);
});

app.get('/api/:id', (req, res) => {
  const dataId = parseInt(req.params.id);
  const item = data.find(item => item.id === dataId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

// Endpoint to add new data
app.post('/api', (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.status(201).json({ message: 'Data added', data: newItem });
});

// Endpoint to delete data by ID
app.delete('/api/:id', (req, res) => {
  const dataId = parseInt(req.params.id);
  const index = data.findIndex(item => item.id === dataId);

  if (index !== -1) {
    const deletedItem = data.splice(index, 1);
    res.json({ message: 'Data deleted', data: deletedItem });
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
