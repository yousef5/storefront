import { Response, Request, NextFunction } from 'express';
import Error from '../interfaces/error.interface';

const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(
    '******************************************************************************************* test'
  );

  const status = error.status || 500;
  const message =
    error.message || 'some thing went wrong ,pls read documentation';
  res.status(status).json({ status: 'error', message });
};

export default errorMiddleware;
