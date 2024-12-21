import { UserRoleEnum } from '@/types/user';

class Dashboard {
  HOME = {
    path: '/',
    requiredRole: [UserRoleEnum.User, UserRoleEnum.Manager, UserRoleEnum.Admin],
    ID: {
      path: ':userId',
      requiredRole: [UserRoleEnum.User, UserRoleEnum.Manager, UserRoleEnum.Admin],
    },
  };
  SIGN_UP = {
    path: '/signup',
  };
  SIGN_IN = {
    path: '/signin',
  };
  USER_TABLE = {
    path: '/user-table',
    requiredRole: [UserRoleEnum.User, UserRoleEnum.Manager, UserRoleEnum.Admin],
    USER_ID: {
      path: ':userId',
      requiredRole: [UserRoleEnum.User, UserRoleEnum.Manager, UserRoleEnum.Admin],
    },
  };
  POSTS = {
    path: '/posts',
    requiredRole: [UserRoleEnum.User, UserRoleEnum.Manager, UserRoleEnum.Admin],
    POST_ID: {
      path: ':postId',
      requiredRole: [UserRoleEnum.User, UserRoleEnum.Manager, UserRoleEnum.Admin],
    },
  };
  HELP = {
    path: '/help',
    requiredRole: [UserRoleEnum.User, UserRoleEnum.Manager, UserRoleEnum.Admin],
  };
  IN_DEVELOPMENT = {
    path: '/in-development',
    requiredRole: [UserRoleEnum.User, UserRoleEnum.Manager, UserRoleEnum.Admin],
  };
  SETTINGS = {
    path: '/settings',
    requiredRole: [UserRoleEnum.User, UserRoleEnum.Manager, UserRoleEnum.Admin],
  };
  ERROR_403 = {
    path: '/403',
    requiredRole: [UserRoleEnum.User, UserRoleEnum.Manager, UserRoleEnum.Admin],
  };
  ERROR_404 = {
    path: '/404',
    requiredRole: [UserRoleEnum.User, UserRoleEnum.Manager, UserRoleEnum.Admin],
  };

  validRole(path: string, roles: UserRoleEnum[]): boolean {
    return Object.values(this).some(
      (page) => path.includes(page.path) && roles.some((role) => page.requiredRole.includes(role))
    );
  }

  validPath(path: string): boolean {
    return Object.values(this).some((page) => page.path === path);
  }
}

export const DASHBOARD_PAGES = new Dashboard();
