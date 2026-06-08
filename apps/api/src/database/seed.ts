import 'reflect-metadata';
import { config } from 'dotenv';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';
import { Like } from '../posts/entities/like.entity';
import { Comment } from '../posts/entities/comment.entity';

config({ path: `${__dirname}/../../.env` });

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME ?? 'codeconnect',
  password: process.env.DB_PASSWORD ?? 'codeconnect',
  database: process.env.DB_DATABASE ?? 'codeconnect',
  entities: [User, Post, Like, Comment],
  synchronize: false,
});

const TAGS_POOL = [
  'React', 'TypeScript', 'CSS', 'Node.js', 'Acessibilidade',
  'Front-end', 'Back-end', 'NestJS', 'TailwindCSS', 'JavaScript',
];

const THUMBNAILS = [
  'https://picsum.photos/seed/code1/600/400',
  'https://picsum.photos/seed/code2/600/400',
  'https://picsum.photos/seed/code3/600/400',
  'https://picsum.photos/seed/code4/600/400',
  'https://picsum.photos/seed/code5/600/400',
  'https://picsum.photos/seed/code6/600/400',
  'https://picsum.photos/seed/code7/600/400',
  'https://picsum.photos/seed/code8/600/400',
  'https://picsum.photos/seed/code9/600/400',
  'https://picsum.photos/seed/code10/600/400',
];

const POSTS_DATA = [
  {
    title: 'Como usar React Hooks efetivamente',
    description: 'Neste post vamos explorar os principais hooks do React como useState, useEffect e useCallback e como utilizá-los da forma correta para escrever código mais limpo e performático.',
    tags: ['React', 'JavaScript', 'Front-end'],
    hasThumbnail: true,
  },
  {
    title: 'Guia completo de TypeScript para iniciantes',
    description: 'TypeScript adiciona tipagem estática ao JavaScript. Neste guia você vai aprender desde os tipos básicos até genéricos e decorators, com exemplos práticos do mundo real.',
    tags: ['TypeScript', 'JavaScript'],
    hasThumbnail: true,
  },
  {
    title: 'Acessibilidade na Web: por onde começar',
    description: 'Acessibilidade não é opcional. Aprenda as diretrizes WCAG 2.1, como usar ARIA corretamente, e ferramentas para testar a acessibilidade do seu projeto.',
    tags: ['Acessibilidade', 'Front-end', 'CSS'],
    hasThumbnail: true,
  },
  {
    title: 'NestJS com TypeORM: boas práticas',
    description: 'Como estruturar um projeto NestJS com TypeORM, separar responsabilidades, usar repositórios, DTOs e validação de dados com class-validator.',
    tags: ['NestJS', 'TypeScript', 'Back-end'],
    hasThumbnail: true,
  },
  {
    title: 'TailwindCSS: design system do zero',
    description: 'Crie um design system consistente com TailwindCSS, tokens de cor, tipografia padronizada e componentes reutilizáveis sem escrever CSS customizado.',
    tags: ['TailwindCSS', 'CSS', 'Front-end'],
    hasThumbnail: true,
  },
  {
    title: 'Performance em React: evite re-renders desnecessários',
    description: 'Re-renders excessivos são uma das causas mais comuns de lentidão em apps React. Aprenda a usar React.memo, useMemo e useCallback para otimizar seus componentes.',
    tags: ['React', 'JavaScript', 'Front-end'],
    hasThumbnail: true,
  },
  {
    title: 'APIs REST com Node.js e Express',
    description: 'Construa uma API REST completa com Node.js, Express, validação de dados, autenticação JWT e integração com banco de dados PostgreSQL.',
    tags: ['Node.js', 'Back-end', 'JavaScript'],
    hasThumbnail: true,
  },
  {
    title: 'CSS Grid vs Flexbox: quando usar cada um',
    description: 'Grid e Flexbox são ferramentas complementares. Entenda as diferenças, veja exemplos práticos e saiba exatamente quando aplicar cada layout technique.',
    tags: ['CSS', 'Front-end'],
    hasThumbnail: true,
  },
  {
    title: 'Introdução ao Docker para desenvolvedores',
    description: 'Aprenda a containerizar sua aplicação com Docker, criar Dockerfiles eficientes, usar docker-compose para orquestrar múltiplos serviços e publicar imagens.',
    tags: ['Back-end', 'Node.js'],
    hasThumbnail: true,
  },
  {
    title: 'Testes automatizados com Jest e Testing Library',
    description: 'Testes são essenciais para código confiável. Aprenda a escrever testes unitários e de integração com Jest, e testes de componentes React com Testing Library.',
    tags: ['React', 'TypeScript', 'Front-end'],
    hasThumbnail: true,
  },
  {
    title: 'Padrões de design com TypeScript',
    description: 'Implemente os padrões de design mais comuns — Singleton, Factory, Observer, Strategy — em TypeScript com exemplos práticos e quando aplicar cada um.',
    tags: ['TypeScript', 'Back-end'],
    hasThumbnail: false,
  },
  {
    title: 'Estado global sem Redux: Zustand e Jotai',
    description: 'Alternativas modernas e leves ao Redux para gerenciamento de estado global em aplicações React. Comparação de abordagens e casos de uso.',
    tags: ['React', 'JavaScript'],
    hasThumbnail: false,
  },
  {
    title: 'Web Vitals: métricas de performance que importam',
    description: 'LCP, CLS, INP — as Core Web Vitals do Google são indicadores chave de qualidade. Aprenda a medi-las, interpretá-las e otimizá-las em sua aplicação.',
    tags: ['Front-end', 'Acessibilidade'],
    hasThumbnail: false,
  },
  {
    title: 'Autenticação segura com JWT e Refresh Tokens',
    description: 'Implemente um fluxo de autenticação robusto com JWT, refresh tokens, rotação automática e revogação. Evite as armadilhas comuns de segurança.',
    tags: ['Back-end', 'NestJS', 'TypeScript'],
    hasThumbnail: false,
  },
  {
    title: 'Design Tokens: a ponte entre design e código',
    description: 'Design tokens garantem consistência visual entre Figma e código. Aprenda a definir, exportar e sincronizar tokens de cor, tipografia e espaçamento.',
    tags: ['CSS', 'Front-end', 'TailwindCSS'],
    hasThumbnail: false,
  },
];

async function seed() {
  await dataSource.initialize();
  console.log('Database connected.');

  const userRepo = dataSource.getRepository(User);
  const postRepo = dataSource.getRepository(Post);
  const likeRepo = dataSource.getRepository(Like);
  const commentRepo = dataSource.getRepository(Comment);

  // Clean existing seed data (idempotent)
  await commentRepo.delete({});
  await likeRepo.delete({});
  await postRepo.delete({});
  await userRepo.delete({});

  // Create users
  const passwordHash = await bcrypt.hash('123456', 10);

  const julio = userRepo.create({ name: 'Julio Oliveira', email: 'julio@example.com', password: passwordHash });
  const ana = userRepo.create({ name: 'Ana Lima', email: 'ana@example.com', password: passwordHash });

  await userRepo.save([julio, ana]);
  console.log('Users created:', julio.email, ana.email);

  // Create posts
  let thumbnailIndex = 0;
  const authors = [julio, ana];
  const createdPosts: Post[] = [];

  for (let i = 0; i < POSTS_DATA.length; i++) {
    const data = POSTS_DATA[i];
    const post = postRepo.create({
      title: data.title,
      description: data.description,
      tags: data.tags,
      thumbnailUrl: data.hasThumbnail ? THUMBNAILS[thumbnailIndex++ % THUMBNAILS.length] : null,
      author: authors[i % 2],
    });
    const saved = await postRepo.save(post);
    createdPosts.push(saved);
  }
  console.log(`Created ${createdPosts.length} posts.`);

  // Create likes (first 8 posts liked by both users)
  for (let i = 0; i < 8; i++) {
    await likeRepo.save(likeRepo.create({ post: createdPosts[i], user: julio }));
    if (i < 5) {
      await likeRepo.save(likeRepo.create({ post: createdPosts[i], user: ana }));
    }
  }
  console.log('Likes created.');

  // Create comments
  const commentData = [
    { post: createdPosts[0], author: ana, content: 'Excelente explicação sobre hooks! Muito didático.' },
    { post: createdPosts[0], author: julio, content: 'Faltou falar sobre useReducer, mas o conteúdo está ótimo.' },
    { post: createdPosts[1], author: julio, content: 'TypeScript mudou minha forma de programar. Recomendo muito!' },
    { post: createdPosts[2], author: ana, content: 'Acessibilidade é um tema tão importante e ainda pouco discutido.' },
    { post: createdPosts[3], author: ana, content: 'Uso NestJS há 2 anos e ainda aprendi coisas novas aqui.' },
    { post: createdPosts[4], author: julio, content: 'TailwindCSS é incrível para prototipação rápida.' },
    { post: createdPosts[5], author: ana, content: 'Esse post me salvou de muito debug de re-renders!' },
  ];

  for (const c of commentData) {
    await commentRepo.save(commentRepo.create(c));
  }
  console.log('Comments created.');

  await dataSource.destroy();
  console.log('Seed completed successfully!');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
