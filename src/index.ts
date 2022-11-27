import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import errorMiddleware from './middleware/error.middleware';
import mainRoute from './routes';
const app: express.Application = express();
const address = '0.0.0.0:3000';
/*
Middlewares
*/
//? parse json in body request
app.use(express.json());
//? cors with default
app.use(cors());
//? helmet for security
app.use(helmet());
//? logger
app.use(morgan('common'));

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

/*
Main Route
*/
app.use('/api/v1', mainRoute);

//! error middleware
app.use(errorMiddleware);

//*listen to server
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
