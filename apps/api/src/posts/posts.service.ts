import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';
import { Post } from './entities/post.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import {
  CommentResponseDto,
  PostDetailResponseDto,
  PostResponseDto,
} from './dto/post-response.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(Like) private readonly likeRepo: Repository<Like>,
    @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
  ) {}

  async findAll(q?: string, sort: 'recent' | 'popular' = 'recent'): Promise<PostResponseDto[]> {
    const qb = this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoin('post.likes', 'like')
      .leftJoin('post.comments', 'comment')
      .addSelect('COUNT(DISTINCT like.id)', 'likesCount')
      .addSelect('COUNT(DISTINCT comment.id)', 'commentsCount')
      .groupBy('post.id')
      .addGroupBy('author.id')
      .orderBy('post.createdAt', 'DESC');

    if (q && q.trim()) {
      qb.where(
        'LOWER(post.title) LIKE LOWER(:q) OR LOWER(post.description) LIKE LOWER(:q)',
        { q: `%${q.trim()}%` },
      );
    }

    const { entities, raw } = await qb.getRawAndEntities();

    const posts = entities.map((post, i) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      thumbnailUrl: post.thumbnailUrl,
      tags: post.tags ?? [],
      likesCount: parseInt(raw[i]?.likesCount ?? '0', 10),
      commentsCount: parseInt(raw[i]?.commentsCount ?? '0', 10),
      author: { id: post.author.id, name: post.author.name },
      createdAt: post.createdAt,
    }));

    if (sort === 'popular') {
      posts.sort((a, b) => b.likesCount - a.likesCount);
    }

    return posts;
  }

  async findOne(id: string): Promise<PostDetailResponseDto> {
    const qb = this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoin('post.likes', 'like')
      .leftJoin('post.comments', 'comment')
      .addSelect('COUNT(DISTINCT like.id)', 'likesCount')
      .addSelect('COUNT(DISTINCT comment.id)', 'commentsCount')
      .where('post.id = :id', { id })
      .groupBy('post.id')
      .addGroupBy('author.id');

    const { entities, raw } = await qb.getRawAndEntities();
    if (!entities.length) throw new NotFoundException('Post not found');

    const post = entities[0];
    const comments = await this.getComments(id);

    return {
      id: post.id,
      title: post.title,
      description: post.description,
      thumbnailUrl: post.thumbnailUrl,
      tags: post.tags ?? [],
      likesCount: parseInt(raw[0]?.likesCount ?? '0', 10),
      commentsCount: parseInt(raw[0]?.commentsCount ?? '0', 10),
      author: { id: post.author.id, name: post.author.name },
      createdAt: post.createdAt,
      comments,
    };
  }

  async create(dto: CreatePostDto, userId: string): Promise<PostResponseDto> {
    const post = this.postRepo.create({
      title: dto.title,
      description: dto.description,
      thumbnailUrl: dto.thumbnailUrl ?? null,
      tags: dto.tags ?? [],
      author: { id: userId },
    });
    const saved = await this.postRepo.save(post);
    return this.findOne(saved.id);
  }

  async toggleLike(postId: string, userId: string): Promise<{ liked: boolean; count: number }> {
    const existing = await this.likeRepo.findOneBy({
      post: { id: postId },
      user: { id: userId },
    });

    if (existing) {
      await this.likeRepo.remove(existing);
      const count = await this.likeRepo.countBy({ post: { id: postId } });
      return { liked: false, count };
    }

    const post = await this.postRepo.findOneBy({ id: postId });
    if (!post) throw new NotFoundException('Post not found');

    const like = this.likeRepo.create({ post: { id: postId }, user: { id: userId } });
    await this.likeRepo.save(like);
    const count = await this.likeRepo.countBy({ post: { id: postId } });
    return { liked: true, count };
  }

  async createComment(
    postId: string,
    dto: CreateCommentDto,
    userId: string,
  ): Promise<CommentResponseDto> {
    const post = await this.postRepo.findOneBy({ id: postId });
    if (!post) throw new NotFoundException('Post not found');

    const comment = this.commentRepo.create({
      content: dto.content,
      post: { id: postId },
      author: { id: userId },
    });
    const saved = await this.commentRepo.save(comment);

    const full = await this.commentRepo.findOne({
      where: { id: saved.id },
      relations: { author: true },
    });

    return {
      id: full!.id,
      content: full!.content,
      author: { id: full!.author.id, name: full!.author.name },
      createdAt: full!.createdAt,
    };
  }

  async getComments(postId: string): Promise<CommentResponseDto[]> {
    const comments = await this.commentRepo.find({
      where: { post: { id: postId } },
      relations: { author: true },
      order: { createdAt: 'DESC' },
    });

    return comments.map((c) => ({
      id: c.id,
      content: c.content,
      author: { id: c.author.id, name: c.author.name },
      createdAt: c.createdAt,
    }));
  }
}
