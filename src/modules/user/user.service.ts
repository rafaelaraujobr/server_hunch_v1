import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  findAll(queryUserDto: QueryUserDto) {
    return this.userRepository.findAll(queryUserDto);
  }

  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
  findByCompany(company_id: string) {
    return this.userRepository.findByCompany(company_id);
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
