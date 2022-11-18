import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  Body,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PostDto } from './dto/post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Return a list of first 5 posts',
  })
  async findAll() {
    return this.postsService.findAll();
  }

  @Get('pagination')
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'a number of page (pagination)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return a list of first 5 posts of the selected page',
  })
  async pagination(@Query('page') query: number) {
    return this.postsService.pagination(query);
  }

  @Get('filter') // http://localhost:3000/posts/filter?author=summm
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'filter by title',
  })
  @ApiQuery({
    name: 'author',
    required: false,
    description: 'filter by author',
  })
  @ApiQuery({
    name: 'tag',
    required: false,
    description: 'filter by tag',
  })
  @ApiResponse({
    status: 200,
    description: 'Return a list of posts of the selected filter',
  })
  async filter(@Query() query: string) {
    return this.postsService.filter(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Return a book based on a particular id',
  })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Delete(':id')
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'Delete by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Delete the post related to the id provided',
  })
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @Post()
  async create(@Body() postDto: PostDto) {
    return postDto;
  }
}
