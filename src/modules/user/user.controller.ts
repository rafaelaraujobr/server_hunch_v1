import {
  Controller,
  Get,
  Query,
  // Post,
  // Body,
  // Patch,
  Param,
  ParseUUIDPipe,
  // Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  index(@Query() queryUserDto: QueryUserDto) {
    return this.userService.findAll(queryUserDto);
  }

  @Get(':id')
  show(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }
  @Get(':company_id/companies')
  findByCompany(@Param('company_id', new ParseUUIDPipe()) company_id: string) {
    return this.userService.findByCompany(company_id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
