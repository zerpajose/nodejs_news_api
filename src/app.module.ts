import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './posts/entities/post.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/entities/tag.entity';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME_DEVELOPMENT,
      models: [Post, Tag],
      autoLoadModels: true,
    }),
    ScheduleModule.forRoot(),
    PostsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
