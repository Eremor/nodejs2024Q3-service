import { hash, compare } from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const salt = parseInt(process.env.CRYPT_SALT || '10', 10)
  return hash(password, salt)
}

export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return compare(plainPassword, hashedPassword)
}