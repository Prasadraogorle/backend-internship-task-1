import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { DoctorProfile } from '../doctor/doctor.entity';
import { PatientProfile } from '../patient/patient.entity';

export enum AppointmentStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DoctorProfile, { eager: true })
  doctor: DoctorProfile;

  @ManyToOne(() => PatientProfile, { eager: true })
  patient: PatientProfile;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;
}
