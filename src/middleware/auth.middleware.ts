import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import vars from '../vars';
import Error from '../interfaces/error.interface';

const handleError = (next: NextFunction) => {
  const error: Error = new Error('Problem with Authentication');
  error.status = 401;
  next(error);
};

const authMiddleWare = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authFromHeader = req.get('Authorization');

    if (authFromHeader) {
      const splitHeader = authFromHeader.split(' ');
      const bearer = splitHeader[0].toLowerCase();
      const token = splitHeader[1];
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(token, vars.tokenSecret as unknown as string);

        if (decode) {
          next();
        } else {
          handleError(next);
        }
      } else {
        handleError(next);
      }
    } else {
      handleError(next);
    }
  } catch (error) {
    handleError(next);
  }
};

export default authMiddleWare;
