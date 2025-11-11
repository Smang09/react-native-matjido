import {MutationFunction, useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

import {
  editProfile,
  getAccessToken,
  getProfile,
  kakaoLogin,
  logout,
  postLogin,
  postSignup,
  ResponseToken,
} from '@/api/auth';
import queryClient from '@/api/queryClient';
import {queryKeys, storageKeys} from '@/constants/keys';
import {numbers} from '@/constants/numbers';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/api';
import {Profile} from '@/types/domain';
import {removeHeader, setHeader} from '@/utils/header';
import {encryptedStorage} from '@/utils/storage/encryptStorage';

const useSignup = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postSignup,
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
};

const useLogin = <T>(
  loginAPI: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: async ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      await encryptedStorage.set(storageKeys.REFRESH_TOKEN, refreshToken);
      queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
    },
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
};

const useEmailLogin = (mutationOptions?: UseMutationCustomOptions) => {
  return useLogin(postLogin, mutationOptions);
};

const useKaKaoLogin = (mutationOptions?: UseMutationCustomOptions) => {
  return useLogin(kakaoLogin, mutationOptions);
};

const useLogout = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      removeHeader('Authorization');
      await encryptedStorage.remove(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
};

const useGetRefreshToken = () => {
  const {data, isSuccess, isError} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        setHeader('Authorization', `Bearer ${data.accessToken}`);
        await encryptedStorage.set(
          storageKeys.REFRESH_TOKEN,
          data.refreshToken,
        );
      }
    })();
  }, [isSuccess, data]);

  useEffect(() => {
    (async () => {
      if (isError) {
        removeHeader('Authorization');
        await encryptedStorage.remove(storageKeys.REFRESH_TOKEN);
      }
    })();
  }, [isError]);

  return {isSuccess, isError};
};

const useGetProfile = (queryOptions?: UseQueryCustomOptions<Profile>) => {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    ...queryOptions,
  });
};

const useUpdateProfile = (mutationOption?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOption,
  });
};

const useAuth = () => {
  const signupMutation = useSignup();
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKaKaoLogin();
  const logoutMutation = useLogout();
  const refreshTokenQuery = useGetRefreshToken();
  const {data, isSuccess: isLogin} = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const profileMutation = useUpdateProfile();

  return {
    isLogin,
    auth: {
      id: data?.id ?? '',
      nickname: data?.nickname ?? '',
      email: data?.email ?? '',
      imageUrl: data?.imageUri ?? '',
    },
    signupMutation,
    loginMutation,
    kakaoLoginMutation,
    logoutMutation,
    profileMutation,
  };
};

export default useAuth;
