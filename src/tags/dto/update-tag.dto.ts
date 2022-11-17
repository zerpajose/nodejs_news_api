import { PartialType } from '@nestjs/mapped-types';
import { TagDto } from './tag.dto';

export class UpdateTagDto extends PartialType(TagDto) {}
