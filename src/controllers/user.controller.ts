import { Response, Request, NextFunction } from 'express';
import UserStore from '../models/user.model';
import User from '../types/user.type';
import jwt from 'jsonwebtoken';
import vars from '../vars';

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
          'missing UserName Or Password Or FirstName Or LastName Or Email'
        );
      }
      //? create user with model
      const user = await userStore.create(req.body as User);
      const token = await jwt.sign(
        { user },
        vars.tokenSecret as unknown as string,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        status: 'success',
        message: `user created : ${user.user_name}`,
        user: user,
        token: token,
      });
    } catch (error) {
      next(error);
    }
  }
  /*
  get all users
  */
  async getAllUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userStore.index();
      res.status(200).json({
        status: 'success',
        users: users,
        message: 'all users ',
      });
    } catch (error) {
      next(error);
    }
  }
  /*
  get one user
  */
  async getOneUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = parseInt(req.params.id as unknown as string);
      const user = await userStore.show(userID);
      res.status(200).json({
        status: user ? 'success' : 'failed',
        user: user,
        message: 'user not exit',
      });
    } catch (error) {
      next(error);
    }
  }
  /*
  update one user
  */
  async updateOneUser(req: Request, res: Response, next: NextFunction) {
    try {
      const updateData: User = req.body;
      //! check
      if (
        !updateData.user_name ||
        !updateData.password ||
        !updateData.email ||
        !updateData.first_name ||
        !updateData.last_name ||
        !updateData.id
      ) {
        throw new Error(
          'missing UserName Or Password Or FirstName Or LastName Or Email Or ID'
        );
      }

      const updateUser = await userStore.update(updateData);

      res.status(200).json({
        status: updateUser ? 'success' : 'failed',
        user: updateUser,
        message: updateUser
          ? 'user updated'
          : `user with id : ${updateData.id} :  not exit`,
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  delete one user
  */
  async deleteOneUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = parseInt(req.params.id as string);
      const user = await userStore.delete(userID);
      console.log(user);
      res.status(200).json({
        status: user ? 'success' : 'failed',
        user: user,
        message: user ? 'user deleted' : `user with id : ${userID} :  not exit`,
      });
    } catch (error) {
      next(error);
    }
  }
  /*
  authenticate
  */
  async authenticateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await userStore.authenticate(email, password);
      if (!user) {
        return res.status(401).json({
          status: 'failed',
          message: 'the username and pass not match',
        });
      }
      const token = jwt.sign({ user }, vars.tokenSecret as unknown as string, {
        expiresIn: '1h',
      });
      return res.json({
        status: 'success',
        data: { ...user, token },
        message: 'user authenticated successfully and token returned',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserStoreController;
