import { Module } from '@nestjs/common';
import { CofeesService } from './cofees.service';
import { CofeesController } from './cofees.controller';

@Module({
  controllers: [CofeesController],
  providers: [CofeesService]
})
export class CofeesModule {}
