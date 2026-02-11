import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientProfile } from './patient.entity';
import { DoctorProfile } from '../doctor/doctor.entity';
import { Appointment } from '../appointment/appointment.entity';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PatientProfile,
      DoctorProfile,
      Appointment,
    ]),
  ],
  controllers: [PatientController],  // ✅ ADD THIS
  providers: [PatientService],       // ✅ ADD THIS
})
export class PatientModule {}
