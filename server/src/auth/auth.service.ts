import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export const register = async (userData: any) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
  });
  return user;
};

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
};
