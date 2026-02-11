import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import type { Request } from 'express';
import { PatientService } from './patient.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('patient')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PATIENT')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('profile')
  createProfile(@Req() req: Request, @Body() body: any) {
    return this.patientService.createProfile(
      (req as any).user.userId,
      body,
    );
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    return this.patientService.getProfile(
      (req as any).user.userId,
    );
  }

  @Put('profile')
  updateProfile(@Req() req: Request, @Body() body: any) {
    return this.patientService.updateProfile(
      (req as any).user.userId,
      body,
    );
  }


  @Post('appointments')
  createAppointment(
    @Req() req: Request,
    @Body('doctorId', ParseIntPipe) doctorId: number,
  ) {
    return this.patientService.createAppointment(
      (req as any).user.userId,
      doctorId,
    );
  }

  @Get('appointments')
  getMyAppointments(@Req() req: Request) {
    return this.patientService.getMyAppointments(
      (req as any).user.userId,
    );
  }
}
