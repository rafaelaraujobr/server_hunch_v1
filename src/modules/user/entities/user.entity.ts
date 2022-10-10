import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  password: string;
  created_at: Date;
  updated_at: Date;
  company_id: string | null;
}
