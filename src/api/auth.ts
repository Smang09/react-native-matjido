import {Profile} from '@/types/domain';
import {encryptedStorage} from '@/utils/storage/encryptStorage';

import axiosInstance from './axios';

type RequestUser = {
  email: string;
  password: string;
};

const postSignup = async ({email, password}: RequestUser): Promise<void> => {
  await axiosInstance.post('/auth/signup', {
    email,
    password,
  });
};

export type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });
  return data;
};

const kakaoLogin = async (token: string): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/oauth/kakao', {token});
  return data;
};

const getProfile = async (): Promise<Profile> => {
  const {data} = await axiosInstance.get('/auth/me');
  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await encryptedStorage.get('refreshToken');

  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

type RequestProfile = Pick<Profile, 'nickname' | 'imageUri'>;

const editProfile = async (body: RequestProfile): Promise<Profile> => {
  const {data} = await axiosInstance.patch('/auth/me', body);
  return data;
};

export {
  postSignup,
  postLogin,
  kakaoLogin,
  getProfile,
  getAccessToken,
  logout,
  editProfile,
};
