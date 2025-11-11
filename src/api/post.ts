import {Post} from '@/types/domain';

import axiosInstance from './axios';

const createPost = async (body: Omit<Post, 'id'>): Promise<Post> => {
  const {data} = await axiosInstance.post('/posts', body);
  return data;
};

const getPost = async (id: number): Promise<Post> => {
  const {data} = await axiosInstance.get(`/posts/${id}`);
  return data;
};

const getPosts = async (page = 1): Promise<Post[]> => {
  const {data} = await axiosInstance.get(`/posts?page=${page}`);
  return data;
};

const deletePost = async (id: number) => {
  const {data} = await axiosInstance.delete(`/posts/${id}`);
  return data;
};

type RequestUpdatePost = {
  id: number;
  body: Omit<Post, 'id' | 'latitude' | 'longitude' | 'address'>;
};

const updatePost = async ({id, body}: RequestUpdatePost): Promise<Post> => {
  const {data} = await axiosInstance.patch(`/posts/${id}`, body);
  return data;
};

const getFavoritePosts = async (page = 1): Promise<Post[]> => {
  const {data} = await axiosInstance.get(`/favorites?page=${page}`);
  return data;
};

const updateFavoritePost = async (id: number): Promise<number> => {
  const {data} = await axiosInstance.post(`/favorites/${id}`);
  return data;
};

export type getCalendarPost = {
  id: number;
  title: string;
  address: string;
};

export type ResponseCalendarPost = Record<number, getCalendarPost[]>;

const getCalendarPosts = async (
  year: number,
  month: number,
): Promise<ResponseCalendarPost> => {
  const {data} = await axiosInstance.get(`/posts?year=${year}&month=${month}`);
  return data;
};

export {
  createPost,
  getPost,
  getPosts,
  deletePost,
  updatePost,
  getFavoritePosts,
  updateFavoritePost,
  getCalendarPosts,
};
