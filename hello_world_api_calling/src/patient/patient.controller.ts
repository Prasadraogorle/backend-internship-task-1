import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('patient')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PATIENT')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('appointments')
  createAppointment(
    @Req() req,
    @Body('doctorId') doctorId: number,
  ) {
    return this.patientService.createAppointment(req.user.userId, doctorId);
  }

  @Get('appointments')
  getMyAppointments(@Req() req) {
    return this.patientService.getMyAppointments(req.user.userId);
  }
}
