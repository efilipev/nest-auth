import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { Role } from '../users/enums/role.enum';
import { Roles } from '../iam/authorization/decorators/role.decorator';
import { Permission } from '../iam/authorization/permission.type';
import { Permissions } from '../iam/authorization/decorators/permissions.decorator';
import { Auth } from '../iam/authentication/decorators/auth.decorator';
import { AuthType } from '../iam/authentication/enums/auth-type.enum';

@Auth(AuthType.Bearer, AuthType.ApiKey)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly cofeesService: CoffeesService) {}

  //@Roles(Role.Admin)
  @Permissions(Permission.Create_Coffee)
  @Post()
  create(@Body() createCofeeDto: CreateCoffeeDto) {
    return this.cofeesService.create(createCofeeDto);
  }

  @Get()
  findAll(@ActiveUser() activeUser: ActiveUserData) {
    return this.cofeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cofeesService.findOne(+id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCofeeDto: UpdateCoffeeDto) {
    return this.cofeesService.update(+id, updateCofeeDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cofeesService.remove(+id);
  }
}
