import { AxiosWithAuth } from '@api/interceptors';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getPost = async (id?: string | number) => {
  const endPoint = `/Posts/${id}`;

  const result: Post = (await AxiosWithAuth.get(endPoint)).data;

  return result;
};
