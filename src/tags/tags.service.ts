import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TagDto } from './dto/tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag)
    private tagModel: typeof Tag,
  ) {}

  async create(tagDto: TagDto) {
    return await this.tagModel.create({
      tag: tagDto.tag,
      post_id: tagDto.post_id,
    });
  }
}
