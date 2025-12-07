import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RefreshTokenGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtRefreshPayload } from './jwt-payload.interface';
import { AuthRequest } from './auth-request.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refresh(@Req() req: AuthRequest) {
    const { id, refreshToken } = req.user;
    return this.authService.refresh(id, refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('logout/:id')
  logout(@Param('id') id: number) {
    return this.authService.logout(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: AuthRequest) {
    const { id } = req.user;
    return this.authService.getProfile(+id);
  }
}
