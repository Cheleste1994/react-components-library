import { AxiosWithAuth } from '@api/interceptors';

import { Post } from './getPost';

export type PostList = Post[];

export const getPosts = async () => {
  const endPoint = `/Posts`;

  const result: PostList = (await AxiosWithAuth.get(endPoint)).data;

  return result;
};
