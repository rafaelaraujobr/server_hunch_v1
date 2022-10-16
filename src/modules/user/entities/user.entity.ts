import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  name: string | null;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
