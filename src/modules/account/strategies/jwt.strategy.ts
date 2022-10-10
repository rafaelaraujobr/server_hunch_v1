import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { Cache } from 'cache-manager';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    // try {
    //   // const beBlackListed = await this.cacheManager.get(payload.sub);
    //   // if (beBlackListed) return false;
    //   returm true
    // } catch (error) {
    //   console.log(error);
    // }
    return { id: payload.sub, role: payload.role };
  }
}
