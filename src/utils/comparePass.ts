import bcrypt from 'bcrypt';
import vars from '../vars';

const comparePass = (password: string, hashPass: string) => {
  const isPasswordVaild = bcrypt.compareSync(
    `${password}${vars.pepper}`,
    hashPass
  );
  return isPasswordVaild;
};

export default comparePass;
