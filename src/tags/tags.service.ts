import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TagDto } from './dto/tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
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

  findAll() {
    return `This action returns all tags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
