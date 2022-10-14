import { BasicStrategy as Strategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from '../account.service';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private accountService: AccountService) {
    super({ passReqToCallback: true });
  }

  async validate(req: any, username: string, password: string): Promise<any> {
    const user = await this.accountService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
