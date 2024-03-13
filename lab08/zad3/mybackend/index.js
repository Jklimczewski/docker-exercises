const express = require('express');
const redis = require('redis');
const keys = require('./conf');
const {Client} = require('pg');
const app = express();
const port = 3000;

const redisClient = redis.createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`,
  retry_strategy: () => 1000
});

const client = new Client({
  host: "mypostgres",
  post: 5432,
  user: 'myappuser',
  password: 'value',
  database: 'myappdb'
});

const newTableFromQuery = async () => {
	const query = `    
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255)
    )`;
    await client.connect();
    try {
        await client.query(query);
    } catch {
      console.log("err")
    }
};

newTableFromQuery()
    .then(() => console.table('New table created!'))
    .catch(error => console.error(error.stack));

(async () => {
  await redisClient.connect();
})();

redisClient.on('ready', () => console.log("Connected!"));
redisClient.on('error', err => console.log('Redis Client Error', err));

app.use(express.json());

app.post('/', async (req, res) => {
  await redisClient.set('hello', 'world');
  res.send("added")
});

app.get('/', async (req, res) => {
  res.send(await redisClient.get('hello'));
});
    
app.post('/users', async (req, res) => {
  const { name, email } = req.body

  client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});