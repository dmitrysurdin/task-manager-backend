import express, { Express } from 'express';
import 'dotenv/config';

const port = process.env.PORT;
const app: Express = express();

app.listen(port);
