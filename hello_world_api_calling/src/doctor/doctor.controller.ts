import {
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Body,
  UseGuards,
  Req,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AppointmentStatus } from '../appointment/appointment.entity';

@Controller('doctor')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('DOCTOR')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  // =======================
  // Doctor Profile APIs
  // =======================

  @Post('profile')
  createProfile(@Req() req, @Body() body) {
    return this.doctorService.createProfile(req.user.userId, body);
  }

  @Get('profile')
  getProfile(@Req() req) {
    return this.doctorService.getProfile(req.user.userId);
  }

  @Put('profile')
  updateProfile(@Req() req, @Body() body) {
    return this.doctorService.updateProfile(req.user.userId, body);
  }

  // =======================
  // Doctor Appointment APIs
  // =======================

  @Get('appointments')
  getAppointments(@Req() req) {
    return this.doctorService.getDoctorAppointments(req.user.userId);
  }

  @Patch('appointments/:id/status')
  updateAppointmentStatus(
    @Req() req,
    @Param('id', ParseIntPipe) appointmentId: number, // ✅ FIX
    @Body('status') status: AppointmentStatus,        // ✅ FIX
  ) {
    return this.doctorService.updateAppointmentStatus(
      req.user.userId,
      appointmentId,
      status,
    );
  }
}
