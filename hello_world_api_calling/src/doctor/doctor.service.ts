import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorProfile } from './doctor.entity';
import { Appointment, AppointmentStatus } from '../appointment/appointment.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorProfile)
    private readonly doctorRepo: Repository<DoctorProfile>,

    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
  ) {}

  // =====================
  // Doctor Profile Logic
  // =====================

  async createProfile(userId: number, body: any) {
    const existing = await this.doctorRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (existing) {
      return { message: 'Doctor profile already exists' };
    }

    const doctor = this.doctorRepo.create({
      ...body,
      user: { id: userId },
    });

    return this.doctorRepo.save(doctor);
  }

  async getProfile(userId: number) {
    const doctor = await this.doctorRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    return doctor;
  }

  async updateProfile(userId: number, body: any) {
    const doctor = await this.getProfile(userId);
    Object.assign(doctor, body);
    return this.doctorRepo.save(doctor);
  }

  // ============================
  // Doctor Appointment Logic
  // ============================

  async getDoctorAppointments(userId: number) {
    const doctor = await this.getProfile(userId);

    return this.appointmentRepo.find({
      where: { doctor: { id: doctor.id } },
    });
  }

  async updateAppointmentStatus(
    userId: number,
    appointmentId: number,
    status: AppointmentStatus,
  ) {
    const doctor = await this.getProfile(userId);

    const appointment = await this.appointmentRepo.findOne({
      where: {
        id: appointmentId,
        doctor: { id: doctor.id },
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    appointment.status = status;
    return this.appointmentRepo.save(appointment);
  }
}
