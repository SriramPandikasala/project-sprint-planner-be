import express from 'express';
import { fetchProjectDataSSE, generateProjectSprintSSE,  } from '../controller/sse.controller.js';

export const baseRouter = express.Router();

baseRouter.get('/', function (req, res) {
  res.send('API works!');
});

baseRouter.get('/generate-sse', generateProjectSprintSSE);

baseRouter.get('/fetch-sse', fetchProjectDataSSE);
