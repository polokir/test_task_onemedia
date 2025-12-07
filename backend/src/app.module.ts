import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RecordsModule } from './records/records.module';
import { UsersController } from './users/users.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './auth/roles.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RefreshTokenGuard } from './auth/guards/jwt-refresh.guard';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, RecordsModule],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
