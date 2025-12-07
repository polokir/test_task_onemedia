import { IsNumber, IsString } from 'class-validator';

export class CreateRecordDto {
  @IsNumber()
  user_id: number;
  @IsString()
  title: string;
  @IsString()
  content: string;
}
