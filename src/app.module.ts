import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './posts/entities/post.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/entities/tag.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1a11aaaa',
      database: 'posts',
      models: [Post, Tag],
    }),
    PostsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
