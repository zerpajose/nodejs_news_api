import { ApiProperty } from '@nestjs/swagger';

export class TagDto {
  @ApiProperty()
  readonly tag: string;
  @ApiProperty()
  readonly post_id: string;
  @ApiProperty()
  readonly createdAt: Date;
  @ApiProperty()
  readonly updatedAt: Date;
}
