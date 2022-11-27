// import pool from '../../databases';
import pool from '../../databases';
import User from '../../types/user.type';
import UserStore from '../user.model';

const userStore = new UserStore();

describe('Test Users ===> Model ', () => {
  describe('Test The Methods in userStore are exist', () => {
    it('should have create method', () => {
      expect(userStore.index).toBeDefined();
    });
    it('should have show Method', () => {
      expect(userStore.show).toBeDefined();
    });
    it('should have index Method', () => {
      expect(userStore.index).toBeDefined();
    });
    it('should have edit Method', () => {
      expect(userStore.update).toBeDefined();
    });
    it('should have delete Method', () => {
      expect(userStore.delete).toBeDefined();
    });
    it('should have authenticate Method', () => {
      expect(userStore.authenticate).toBeDefined();
    });
  });

  describe('TEST User Store Logic', () => {
    const newUser = {
      email: 'johnDoe@test.com',
      user_name: 'testuser',
      first_name: 'john',
      last_name: 'doe',
      password: 'secretPass',
    } as User;
    afterAll(async () => {
      const connection = await pool.connect();
      const sqlQuery =
        'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
      await connection.query(sqlQuery);
      connection.release();
    });
    beforeAll(async () => {
      const connection = await pool.connect();
      const sqlQuery =
        'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
      await connection.query(sqlQuery);
      connection.release();
    });
    it('Create Method : return creates user', async () => {
      const createUser = await userStore.create(newUser);
      expect(createUser).toEqual({
        id: createUser.id,
        email: 'johnDoe@test.com',
        user_name: 'testuser',
        first_name: 'john',
        last_name: 'doe',
      } as User);
    });
    it('Create Method : Refuse duplicate email', async () => {
      await expectAsync(userStore.create(newUser)).toBeRejected();
    });
    it('Index Method  : get all Users in users table with index Methods', async () => {
      const users = await userStore.index();
      expect(users).toHaveSize(1);
      expect(users[0].email).toBe('johnDoe@test.com');
    });
    it('Show Method  : get one user when use show Methods', async () => {
      const user = await userStore.show(1);
      expect(user).toEqual({
        id: 1,
        email: 'johnDoe@test.com',
        user_name: 'testuser',
        first_name: 'john',
        last_name: 'doe',
      } as User);
    });
    it('Show Method  : return empty object when use  id not in database in show Method', async () => {
      const user = await userStore.show(2);
      expect(Object.keys(user).length).toBe(0);
    });
    it('Update Method : retrun updated user', async () => {
      const user = await userStore.update({
        email: 'johnDoe500@test.com',
        user_name: 'test500user',
        first_name: 'john',
        last_name: 'testupdate',
        password: 'noway',
        id: 1,
      });
      expect(user).toEqual({
        id: 1,
        email: 'johnDoe500@test.com',
        user_name: 'test500user',
        first_name: 'john',
        last_name: 'testupdate',
      } as User);
    });
    it('Update Method  : retrun undefined when use id not in database updated user', async () => {
      const user = await userStore.update({
        email: 'johnDoe500@test.com',
        user_name: 'test500user',
        first_name: 'john',
        last_name: 'testupdate',
        password: 'anthor secret',
        id: 2,
      });
      expect(user).toBeUndefined();
    });
    it('Authenticate Method : retrun auth user if email and pass right', async () => {
      const user = await userStore.authenticate('johnDoe500@test.com', 'noway');
      expect(user).toEqual({
        id: 1,
        email: 'johnDoe500@test.com',
        user_name: 'test500user',
        first_name: 'john',
        last_name: 'testupdate',
      } as User);
    });
    it('Authenticate Method : retrun null if email and pass wrong', async () => {
      const user = await userStore.authenticate(
        'johnDoe500@test.com',
        'wrongPass'
      );
      expect(user).toBeNull();
    });
    it('Delete Method :  get undefined when use wrong id', async () => {
      const user = await userStore.delete(2);
      expect(user).toBeUndefined();
    });
    it('Delete Method : get deleted user when use right id', async () => {
      const user = await userStore.delete(1);
      expect(user).toEqual({
        id: 1,
        email: 'johnDoe500@test.com',
        user_name: 'test500user',
        first_name: 'john',
        last_name: 'testupdate',
      } as User);
    });
  });
});
