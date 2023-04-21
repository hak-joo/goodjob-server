import { genSaltSync, hash, compareSync } from 'bcrypt';

export const encodePassword = async (password: string) => {
  const SALT = genSaltSync();
  return hash(password, SALT);
};

export const comparePassword = async (password: string, hash: string) => {
  return compareSync(password, hash);
};
