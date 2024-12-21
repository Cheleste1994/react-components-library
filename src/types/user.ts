export enum UserRoleEnum {
  User = 'user',
  Manager = 'manager',
  Admin = 'admin',
}

export enum UserToken {
  AccessToken = 'access_token',
  RefreshToken = 'refresh_token',
  IdToken = 'id_token',
}

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  roles: UserRoleEnum[];
  userId: string;
}

export type UserLanguage = 'RU' | 'EN';
