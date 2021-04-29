import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import open from 'open';

import translation from './routes/translation';

const server = express();
const port = 5050;

server.use(express.json());
server.use(cors())
server.use('/api/translate', translation);
server.use('/', express.static(__dirname + '/../client'));

server.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  open(`http://localhost:${port}`);
});