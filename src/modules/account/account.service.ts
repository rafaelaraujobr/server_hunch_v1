import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { hash, compareSync } from 'bcrypt';
import { AccountRepository } from './account.repository';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { QuerySessionDto } from './dto/query-session.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
// import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findByEmail(email);
      const isPasswordValid = await compareSync(password, user.password);
      if (!isPasswordValid) return null;
      return user;
    } catch (error) {
      return null;
    }
  }

  async findAllSessions(querySessionDto: QuerySessionDto) {
    return this.accountRepository.findAllSessions(querySessionDto);
  }

  async myData(user: { id: string; role: string }) {
    return this.userService.findOne(user.id);
  }

  async authentication(user: any, userAgent?: string, ipAddress?: string) {
    console.log('user', user);
    const payload = { sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
    await this.accountRepository.deleteSession(user.id);
    await this.accountRepository.createSession({
      user_id: user.id,
      user_agent: userAgent,
      ip_address: ipAddress,
    });
    return {
      access_token: token,
      refresh_token: refreshToken,
    };
  }

  updatePreference(user_id: string, updatePreferenceDto: UpdatePreferenceDto) {
    return this.accountRepository.updatePreference(
      user_id,
      updatePreferenceDto,
    );
  }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return `This action updates a #${id} account`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} account`;
  // }
}
