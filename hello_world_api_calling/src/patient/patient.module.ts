import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientProfile } from './patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientProfile])],
})
export class PatientModule {}
