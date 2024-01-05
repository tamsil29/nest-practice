import { Module } from '@nestjs/common';
import { NinjasController } from './ninjas.controller';

@Module({
  controllers: [NinjasController]
})
export class NinjasModule {}
