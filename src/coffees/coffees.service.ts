import { Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  create(createCoffeeDto: CreateCoffeeDto) {
    return 'This action adds a new cofee';
  }

  findAll() {
    return `This action returns all cofees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cofee`;
  }

  update(id: number, updateCofeeDto: UpdateCoffeeDto) {
    return `This action updates a #${id} cofee`;
  }

  remove(id: number) {
    return `This action removes a #${id} cofee`;
  }
}
