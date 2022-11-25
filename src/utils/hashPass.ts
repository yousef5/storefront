import bcrypt from 'bcrypt';
import vars from '../vars';

const hashPass = (password: string) =>
  bcrypt.hashSync(
    `${password}${vars.pepper}`,
    parseInt(vars.salt as unknown as string, 10)
  );

export default hashPass;
