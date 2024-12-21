import { AxiosWithAuth } from '@api/interceptors';

export interface UserInfo {
  id: number;
  name: string;
  username: string;
  phone: string;
  website: string;
  email: string;
  address: {
    city: string;
  };
}

export type UserList = UserInfo[];

export const getUserList = async (): Promise<UserList> => {
  const endPoint = `/users`;

  const result: UserList = (await AxiosWithAuth.get(endPoint)).data;

  return result;
};
