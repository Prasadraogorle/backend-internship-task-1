import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UserRole } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('select-role')
  @UseGuards(JwtAuthGuard)
  async selectRole(
    @Req() req,
    @Body('role') role: UserRole, // ✅ use enum, not string union
  ) {
    return this.usersService.selectRole(req.user.userId, role);
  }
}
