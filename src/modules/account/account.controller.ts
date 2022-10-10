import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Ip,
  Get,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateAccountDto } from './dto/create-account.dto';
import { QuerySessionDto } from './dto/query-session.dto';
import { RoleGuard } from './role.guard';
import { Roles } from './roles.decorator';
import { Role } from './entities/role.enum';
// import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('api/v1/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.ADMIN)
  @Get('sessions')
  findAllSessions(@Query() querySessionDto: QuerySessionDto) {
    return this.accountService.findAllSessions(querySessionDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('authentication')
  async authentication(@Request() req: any, @Ip() ip: string) {
    const user_agent = req.headers['user-agent'];
    return await this.accountService.authentication(req.user, user_agent, ip);
  }

  // @Get()
  // findAll() {
  //   return this.accountService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.accountService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
  //   return this.accountService.update(+id, updateAccountDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.accountService.remove(+id);
  // }
}
