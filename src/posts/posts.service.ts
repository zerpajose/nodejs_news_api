import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Tag } from 'src/tags/entities/tag.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private userModel: typeof Post,
    @InjectModel(Tag)
    private tagModel: typeof Tag,
    private readonly httpService: HttpService,
  ) {}

  private readonly logger = new Logger(PostsService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    this.logger.debug('Called every 30 seconds');
    const url = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';

    const { data } = await firstValueFrom(
      this.httpService.get<any>(url).pipe(
        catchError((error) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    const mapa = data.hits.map((e) => {
      let title = 'Default Title';
      if (e.title !== null) {
        title = e.title;
      } else if (e.story_title !== null) {
        title = e.story_title;
      }

      let url = 'http://defaulturl.com';
      if (e.url !== null) {
        url = e.url;
      } else if (e.story_url !== null) {
        url = e.story_url;
      }

      return {
        title: title,
        url: url,
        author: e.author,
        tags: e._tags,
      };
    });

    // console.log(mapa);
    await this.create(mapa);
  }

  async create(data) {
    try {
      data.forEach(async (e) => {
        const post = await this.userModel.create({
          title: e.title,
          url: e.url,
          author: e.author,
        });

        const post_id: number = post.dataValues.id;

        e.tags.forEach(async (e) => {
          await this.tagModel.create({
            tag: e,
            post_id: post_id,
          });
        });
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async findAll(): Promise<Post[]> {
    return this.userModel.findAll({ limit: 5 });
  }

  async pagination(page: number) {
    const offset: number = page * 5 - 5;
    return this.userModel.findAll({ offset: offset, limit: 5 });
  }

  findOne(id: number): Promise<Post> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await post.destroy();
  }
}
