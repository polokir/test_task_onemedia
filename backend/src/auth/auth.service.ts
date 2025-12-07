import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { User, Token } from '@prisma-client';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto, UserResponseDto } from '../users/users.dto';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const possibleUser = await this.usersService.findByEmail(
      createAuthDto.email,
    );
    if (possibleUser) {
      throw new ForbiddenException('User already exists');
    }

    createAuthDto.password = await bcrypt.hash(createAuthDto.password, 12);
    console.log(createAuthDto);
    const userDto = new CreateUserDto(createAuthDto);
    const newUser = await this.usersService.create(userDto);
    const tokens = await this.generateTokens(newUser);
    await this.saveRefreshToken(newUser.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      user: new UserResponseDto(newUser),
    };
  }

  async login(dto: LoginAuthDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isValidPass = await bcrypt.compare(dto.password, user.password_hash);
    if (!isValidPass) {
      throw new UnauthorizedException('Invalid password');
    }

    const tokens = this.generateTokens(user);
    await this.saveRefreshToken(user.id, tokens.refreshToken);
    return { ...tokens, user: new UserResponseDto(user) };
  }

  async refresh(userId: number, refreshToken: string) {
    const tokenInDb: Token | null = await this.prisma.token.findFirst({
      where: { user_id: userId },
    });
    if (!tokenInDb) {
      throw new ForbiddenException('Invalid token');
    }

    if (tokenInDb.token !== refreshToken) {
      throw new ForbiddenException('Invalid token');
    }

    if (tokenInDb.expires_at < new Date()) {
      throw new ForbiddenException('Token expired');
    }

    const user = await this.usersService.findById(userId);
    const tokens = this.generateTokens(user);
    await this.saveRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    await this.prisma.token.deleteMany({
      where: { user_id: userId },
    });
  }

  async getProfile(id: number) {
    return await this.usersService.findById(id);
  }

  private generateTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
    };

    const secretAccess = process.env.JWT_ACCESS_SECRET || 'dev-secret';
    const secretRefresh = process.env.JWT_REFRESH_SECRET || 'dev-secret';

    const accessToken = this.jwtService.sign(payload, {
      secret: secretAccess,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: secretRefresh,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
  private async saveRefreshToken(userId: number, refreshToken: string) {
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await this.prisma.token.deleteMany({
      where: { user_id: userId },
    });

    await this.prisma.token.create({
      data: {
        user_id: userId,
        token: refreshToken,
        expires_at: expiresAt,
      },
    });
  }
}
