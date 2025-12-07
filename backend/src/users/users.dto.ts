import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Role } from '@prisma-client';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordDto } from '../records/dto/create-record.dto';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password_hash: string;

  @IsString()
  @MinLength(2)
  @MaxLength(16)
  first_name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(16)
  last_name: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role = Role.USER;
  constructor(createAuthDto: CreateAuthDto) {
    this.email = createAuthDto.email;
    this.password_hash = createAuthDto.password;
    this.first_name = createAuthDto.first_name;
    this.last_name = createAuthDto.last_name;
  }
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserResponseDto {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  created_at: Date;
  updated_at: Date;

  constructor(user: any) {
    this.id = user.id;
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.role = user.role;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}
