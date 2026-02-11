import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientProfile } from './patient.entity';
import { DoctorProfile } from '../doctor/doctor.entity';
import {
  Appointment,
  AppointmentStatus,
} from '../appointment/appointment.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientProfile)
    private readonly patientRepo: Repository<PatientProfile>,

    @InjectRepository(DoctorProfile)
    private readonly doctorRepo: Repository<DoctorProfile>,

    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
  ) {}
  async createProfile(userId: number, body: any) {
    const existing = await this.patientRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (existing) {
      throw new BadRequestException('Patient profile already exists');
    }

    const patient = this.patientRepo.create({
      ...body,
      user: { id: userId },
    });

    return this.patientRepo.save(patient);
  }

  async getProfile(userId: number) {
    const patient = await this.patientRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }

    return patient;
  }

  async updateProfile(userId: number, body: any) {
    const patient = await this.getProfile(userId);
    Object.assign(patient, body);
    return this.patientRepo.save(patient);
  }


  async createAppointment(userId: number, doctorId: number) {
    const patient = await this.patientRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }

    const doctor = await this.doctorRepo.findOne({
      where: { id: doctorId },
      relations: ['user'],
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    const appointment = this.appointmentRepo.create({
      patient,
      doctor,
      status: AppointmentStatus.PENDING,
    });

    return this.appointmentRepo.save(appointment);
  }

  async getMyAppointments(userId: number) {
    const patient = await this.patientRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }

    return this.appointmentRepo.find({
      where: { patient: { id: patient.id } },
      relations: ['doctor', 'doctor.user'],
      order: { id: 'DESC' },
    });
  }
}
