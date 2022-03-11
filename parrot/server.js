import express from 'express';
import cors from 'cors';
import parrot from 'parrot-middleware';
import scenarios from './scenarios/scenarios';

const app = express();
app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTION'],
}));

app.use(parrot(scenarios));
app.listen(3050);
export default app;
