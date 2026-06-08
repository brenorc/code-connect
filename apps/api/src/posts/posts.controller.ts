import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import {
  CommentResponseDto,
  PostDetailResponseDto,
  PostResponseDto,
} from './dto/post-response.dto';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'List posts (public). Supports full-text search and sorting.' })
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: ['recent', 'popular'] })
  @ApiResponse({ status: 200, type: [PostResponseDto] })
  findAll(
    @Query('q') q?: string,
    @Query('sort') sort?: 'recent' | 'popular',
  ): Promise<PostResponseDto[]> {
    return this.postsService.findAll(q, sort);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single post with comments (public).' })
  @ApiResponse({ status: 200, type: PostDetailResponseDto })
  findOne(@Param('id') id: string): Promise<PostDetailResponseDto> {
    return this.postsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a post (authenticated).' })
  @ApiResponse({ status: 201, type: PostResponseDto })
  create(@Body() dto: CreatePostDto, @Request() req): Promise<PostResponseDto> {
    return this.postsService.create(dto, req.user.userId);
  }

  @Post(':id/likes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Toggle like on a post (authenticated).' })
  @ApiResponse({ status: 200, schema: { example: { liked: true, count: 5 } } })
  toggleLike(
    @Param('id') id: string,
    @Request() req,
  ): Promise<{ liked: boolean; count: number }> {
    return this.postsService.toggleLike(id, req.user.userId);
  }

  @Get(':id/comments')
  @ApiOperation({ summary: 'Get comments for a post (public).' })
  @ApiResponse({ status: 200, type: [CommentResponseDto] })
  getComments(@Param('id') id: string): Promise<CommentResponseDto[]> {
    return this.postsService.getComments(id);
  }

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Comment on a post (authenticated).' })
  @ApiResponse({ status: 201, type: CommentResponseDto })
  createComment(
    @Param('id') id: string,
    @Body() dto: CreateCommentDto,
    @Request() req,
  ): Promise<CommentResponseDto> {
    return this.postsService.createComment(id, dto, req.user.userId);
  }
}
