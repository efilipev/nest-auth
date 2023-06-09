import { PartialType } from '@nestjs/mapped-types';
import { CreateCofeeDto } from './create-cofee.dto';

export class UpdateCofeeDto extends PartialType(CreateCofeeDto) {}
