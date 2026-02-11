import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ======================
  // REGISTER
  // ======================
  @Post('register')
  register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.register(email, password);
  }

  // ======================
  // LOGIN
  // ======================
  @Post('login')
  login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  // ======================
  // GOOGLE LOGIN (ONLY AUTH)
  // ======================
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // handled by passport
  }

  // ======================
  // GOOGLE CALLBACK
  // ======================
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req.user);
  }
}
