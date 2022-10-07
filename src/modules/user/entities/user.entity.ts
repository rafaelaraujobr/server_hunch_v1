import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  name: string;
  email: string;
  password: string;
  roles_id: string;
  created_at: Date;
  updated_at: Date;
  company_id: string;
}
