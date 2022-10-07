import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { hash } from 'bcrypt';
import { AccountRepository } from './account.repository';
import { UserService } from '../user/user.service';
// import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly userService: UserService,
  ) {}
  async create(createAccountDto: CreateAccountDto) {
    const isUserExists = await this.userService.findByEmail(
      createAccountDto.email,
    );
    if (isUserExists) throw new NotFoundException('User already exists');
    return this.accountRepository.create({
      ...createAccountDto,
      password: await hash(createAccountDto.password, 10),
    });
  }

  // findAll() {
  //   return `This action returns all account`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} account`;
  // }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return `This action updates a #${id} account`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} account`;
  // }
}
