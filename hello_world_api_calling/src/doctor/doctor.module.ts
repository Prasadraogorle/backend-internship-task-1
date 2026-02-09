import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { DoctorProfile } from './doctor.entity';
import { Appointment } from '../appointment/appointment.entity'; // ✅ ADD

@Module({
  imports: [TypeOrmModule.forFeature([DoctorProfile, Appointment])], // ✅ ADD
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
