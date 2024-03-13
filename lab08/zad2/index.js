const express = require('express');
const redis = require('redis');
const app = express();
const keys = require('./conf');
const port = 3000;

const client = redis.createClient({
    url: `redis://${keys.redisHost}:${keys.redisPort}`,
    retry_strategy: () => 1000
});

(async () => {
  await client.connect();
})();

client.on('ready', () => console.log("Connected!"));
client.on('error', err => console.log('Redis Client Error', err));

app.use(express.json());

app.post('/', async (req, res) => {
  await client.set('hello', 'world');
  res.send("added")
});

app.get('/', async (req, res) => {
  res.send(await client.get('hello'));
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
