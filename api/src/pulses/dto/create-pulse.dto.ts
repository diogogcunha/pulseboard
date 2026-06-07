import { IsString, IsIn, MinLength, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePulseDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  question: string;

  @ApiProperty({ enum: ['scale', 'emoji', 'text'] })
  @IsIn(['scale', 'emoji', 'text'])
  responseType: 'scale' | 'emoji' | 'text';

  @ApiProperty()
  @IsUUID()
  teamId: string;
}
