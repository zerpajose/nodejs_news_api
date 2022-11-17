import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { HttpModule } from '@nestjs/axios';
import { Tag } from 'src/tags/entities/tag.entity';

@Module({
  imports: [
    HttpModule,
    SequelizeModule.forFeature([Post]),
    SequelizeModule.forFeature([Tag]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [SequelizeModule],
})
export class PostsModule {}
