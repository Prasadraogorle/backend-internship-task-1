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
import type { Request } from 'express';
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

  @Post('profile')
  createProfile(@Req() req: Request, @Body() body: any) {
    return this.doctorService.createProfile(
      (req as any).user.userId,
      body,
    );
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    return this.doctorService.getProfile(
      (req as any).user.userId,
    );
  }

  @Put('profile')
  updateProfile(@Req() req: Request, @Body() body: any) {
    return this.doctorService.updateProfile(
      (req as any).user.userId,
      body,
    );
  }



  @Get('appointments')
  getAppointments(@Req() req: Request) {
    return this.doctorService.getDoctorAppointments(
      (req as any).user.userId,
    );
  }

  @Patch('appointments/:id/status')
  updateAppointmentStatus(
    @Req() req: Request,
    @Param('id', ParseIntPipe) appointmentId: number,
    @Body('status') status: AppointmentStatus,
  ) {
    return this.doctorService.updateAppointmentStatus(
      (req as any).user.userId,
      appointmentId,
      status,
    );
  }
}
