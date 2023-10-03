import express from 'express';
import cors from 'cors';
import { baseRouter } from './src/route/base.route.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(compression())
app.use('/api', baseRouter);

const port = process.env.PORT || '8084';
app.set('port', port);

app.listen(port, function () {
  console.info(`Server is up and running on port ${port}`);
});
