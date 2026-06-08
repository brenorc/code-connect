import axios, { isAxiosError } from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
})

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface UserResponse {
  id: string
  name: string
  email: string
}

export interface LoginResponse {
  access_token: string
}

export interface PostAuthor {
  id: string
  name: string
}

export interface PostResponse {
  id: string
  title: string
  description: string
  thumbnailUrl: string | null
  tags: string[]
  likesCount: number
  commentsCount: number
  author: PostAuthor
  createdAt: string
}

export interface CommentResponse {
  id: string
  content: string
  author: PostAuthor
  createdAt: string
}

export interface PostDetailResponse extends PostResponse {
  comments: CommentResponse[]
}

export interface CreatePostPayload {
  title: string
  description: string
  thumbnailUrl?: string
  tags?: string[]
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` }
}

export const api = {
  register: (payload: RegisterPayload): Promise<UserResponse> =>
    http.post<UserResponse>('/users', payload).then((r) => r.data),

  login: (payload: LoginPayload): Promise<LoginResponse> =>
    http.post<LoginResponse>('/auth/login', payload).then((r) => r.data),

  getMe: (token: string): Promise<UserResponse> =>
    http
      .get<UserResponse>('/auth/me', { headers: authHeaders(token) })
      .then((r) => r.data),

  getPosts: (q?: string, sort?: 'recent' | 'popular'): Promise<PostResponse[]> => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (sort) params.set('sort', sort)
    return http.get<PostResponse[]>(`/posts?${params}`).then((r) => r.data)
  },

  getPost: (id: string): Promise<PostDetailResponse> =>
    http.get<PostDetailResponse>(`/posts/${id}`).then((r) => r.data),

  createPost: (payload: CreatePostPayload, token: string): Promise<PostResponse> =>
    http
      .post<PostResponse>('/posts', payload, { headers: authHeaders(token) })
      .then((r) => r.data),

  likePost: (postId: string, token: string): Promise<{ liked: boolean; count: number }> =>
    http
      .post<{ liked: boolean; count: number }>(`/posts/${postId}/likes`, {}, {
        headers: authHeaders(token),
      })
      .then((r) => r.data),

  createComment: (postId: string, content: string, token: string): Promise<CommentResponse> =>
    http
      .post<CommentResponse>(`/posts/${postId}/comments`, { content }, {
        headers: authHeaders(token),
      })
      .then((r) => r.data),

  getComments: (postId: string): Promise<CommentResponse[]> =>
    http.get<CommentResponse[]>(`/posts/${postId}/comments`).then((r) => r.data),
}

export { isAxiosError }
