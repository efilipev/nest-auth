import { Injectable } from '@nestjs/common';
import { CreateCofeeDto } from './dto/create-cofee.dto';
import { UpdateCofeeDto } from './dto/update-cofee.dto';

@Injectable()
export class CofeesService {
  create(createCofeeDto: CreateCofeeDto) {
    return 'This action adds a new cofee';
  }

  findAll() {
    return `This action returns all cofees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cofee`;
  }

  update(id: number, updateCofeeDto: UpdateCofeeDto) {
    return `This action updates a #${id} cofee`;
  }

  remove(id: number) {
    return `This action removes a #${id} cofee`;
  }
}
