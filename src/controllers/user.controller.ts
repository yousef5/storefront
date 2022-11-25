import { Response, Request, NextFunction } from 'express';
import UserStore from '../models/user.model';
import User from '../types/user.type';

const userStore = new UserStore();

class UserStoreController {
  /*
    create user controller
 */
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      //! check
      if (
        !req.body.user_name ||
        !req.body.password ||
        !req.body.email ||
        !req.body.first_name ||
        !req.body.last_name
      ) {
        throw new Error(
          'missing UserName Or Password Or FirstName Or LastName'
        );
      }
      //? create user with model
      const user = await userStore.create(req.body as User);

      res.status(200).json({
        status: 'success',
        message: `user created : ${user.user_name}`,
        user: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserStoreController;
