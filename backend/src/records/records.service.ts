import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecordsService {
  constructor(private prisma: PrismaService) {}
  async create(createRecordDto: CreateRecordDto) {
    return this.prisma.record.create({ data: { ...createRecordDto } });
  }

  async findAll() {
    return this.prisma.record.findMany();
  }

  async findOne(id: number) {
    return this.prisma.record.findUnique({ where: { id } });
  }

  async update(id: number, updateRecordDto: UpdateRecordDto) {
    console.log(id, updateRecordDto);
    return this.prisma.record.update({
      where: { id },
      data: { ...updateRecordDto },
    });
  }

  async remove(id: number) {
    return this.prisma.record.delete({ where: { id } });
  }
}
