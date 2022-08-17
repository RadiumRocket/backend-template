import cors from 'cors';
import express, { Express, Response } from 'express';

const app: Express = express();

app.use(cors());

app.use(express.json());

app.get('/', (_req, res: Response) => {
  res.send('Server is up ✅');
});

export default app;
