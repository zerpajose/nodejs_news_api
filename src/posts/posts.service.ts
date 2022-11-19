import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Tag } from '../tags/entities/tag.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
    @InjectModel(Tag)
    private tagModel: typeof Tag,
    private readonly httpService: HttpService,
  ) {}

  private readonly logger = new Logger(PostsService.name);

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.debug('Called hourly');
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

    await this.create(mapa);
  }

  async create(data) {
    try {
      data.forEach(async (e) => {
        const post = await this.postModel.create({
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
    return this.postModel.findAll({ limit: 5 });
  }

  async pagination(query: number) {
    const offset = query * 5 - 5;
    return this.postModel.findAll({ offset: offset, limit: 5 });
  }

  async filter(query) {
    let results;
    if (Object.keys(query)[0] === 'author') {
      results = this.postModel.findAll({
        where: { author: query.author },
      });
    } else if (Object.keys(query)[0] === 'title') {
      results = this.postModel.findAll({
        where: { title: query.title },
      });
    } else if (Object.keys(query)[0] === 'tag') {
      results = this.postModel.findAll({
        attributes: ['title', 'url', 'author'],
        include: [
          {
            model: Tag,
            where: {
              tag: query.tag,
            },
          },
        ],
      });
    } else {
      results = {
        status: 404,
        error: 'Not Found',
      };
    }

    return results;
  }

  findOne(id: number) {
    return this.postModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    if(post === null){
      return {
        status: 404,
        error: 'Not Found',
      };
    }
    await post.destroy();
    return post;
  }
}
