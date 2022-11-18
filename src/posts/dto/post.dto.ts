import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly url: string;
  @ApiProperty()
  readonly author: string;
  @ApiProperty()
  readonly createdAt: Date;
  @ApiProperty()
  readonly updatedAt: Date;
}
