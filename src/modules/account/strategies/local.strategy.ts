import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from '../account.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private accountService: AccountService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.accountService.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
