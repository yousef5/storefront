// import pool from '../../databases';
// import User from '../../types/user.type';
import UserStore from '../user.model';

const userStore = new UserStore();

describe('Test Users Model', () => {
  describe('Test The Methods in userStore are exist', () => {
    it('should have create method', () => {
      expect(userStore.index).toBeDefined();
    });
  });
});
