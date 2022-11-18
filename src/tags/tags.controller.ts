import { Controller, Post, Body } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagDto } from './dto/tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async create(@Body() tagDto: TagDto) {
    return await this.tagsService.create(tagDto);
  }
}
