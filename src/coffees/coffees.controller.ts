import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';

import { CofeesService } from './cofees.service';
import { CreateCofeeDto } from './dto/create-cofee.dto';
import { UpdateCofeeDto } from './dto/update-cofee.dto';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { Role } from '../users/enums/role.enum';
import { Roles } from '../iam/authorization/decorators/role.decorator';

@Controller('cofees')
export class CofeesController {
  constructor(private readonly cofeesService: CofeesService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createCofeeDto: CreateCofeeDto) {
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
  update(@Param('id') id: string, @Body() updateCofeeDto: UpdateCofeeDto) {
    return this.cofeesService.update(+id, updateCofeeDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cofeesService.remove(+id);
  }
}
