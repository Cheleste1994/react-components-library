export * from './directions/getDirections';
export * from './posts/getPosts';
export * from './posts/getPost';
export * from './users/getUserList';

export interface ApiResponse<T> {
  code: number;
  errors: string[];
  data: T;
  succeeded: boolean;
}

export type ApiResponseData<T> = {
  items: T;
  totalCount: number;
  limit: number;
  offset: number;
};
