/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as VerifyEmailImport } from './routes/verify-email'
import { Route as SignupImport } from './routes/signup'
import { Route as ResetPasswordImport } from './routes/reset-password'
import { Route as LoginImport } from './routes/login'
import { Route as ForgotPasswordImport } from './routes/forgot-password'
import { Route as AuthroutesImport } from './routes/_auth_routes'
import { Route as IndexImport } from './routes/index'
import { Route as AuthroutesProfileImport } from './routes/_auth_routes/profile'
import { Route as AuthroutesDashboardImport } from './routes/_auth_routes/dashboard'
import { Route as AuthroutesCreateAlertImport } from './routes/_auth_routes/create-alert'
import { Route as AuthroutesJobsIdImport } from './routes/_auth_routes/jobs.$id'
import { Route as AuthroutesJobAlertIdImport } from './routes/_auth_routes/job-alert.$id'

// Create/Update Routes

const VerifyEmailRoute = VerifyEmailImport.update({
  path: '/verify-email',
  getParentRoute: () => rootRoute,
} as any)

const SignupRoute = SignupImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const ResetPasswordRoute = ResetPasswordImport.update({
  path: '/reset-password',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ForgotPasswordRoute = ForgotPasswordImport.update({
  path: '/forgot-password',
  getParentRoute: () => rootRoute,
} as any)

const AuthroutesRoute = AuthroutesImport.update({
  id: '/_auth_routes',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthroutesProfileRoute = AuthroutesProfileImport.update({
  path: '/profile',
  getParentRoute: () => AuthroutesRoute,
} as any)

const AuthroutesDashboardRoute = AuthroutesDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => AuthroutesRoute,
} as any)

const AuthroutesCreateAlertRoute = AuthroutesCreateAlertImport.update({
  path: '/create-alert',
  getParentRoute: () => AuthroutesRoute,
} as any)

const AuthroutesJobsIdRoute = AuthroutesJobsIdImport.update({
  path: '/jobs/$id',
  getParentRoute: () => AuthroutesRoute,
} as any)

const AuthroutesJobAlertIdRoute = AuthroutesJobAlertIdImport.update({
  path: '/job-alert/$id',
  getParentRoute: () => AuthroutesRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth_routes': {
      id: '/_auth_routes'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthroutesImport
      parentRoute: typeof rootRoute
    }
    '/forgot-password': {
      id: '/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof ForgotPasswordImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/reset-password': {
      id: '/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof ResetPasswordImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/verify-email': {
      id: '/verify-email'
      path: '/verify-email'
      fullPath: '/verify-email'
      preLoaderRoute: typeof VerifyEmailImport
      parentRoute: typeof rootRoute
    }
    '/_auth_routes/create-alert': {
      id: '/_auth_routes/create-alert'
      path: '/create-alert'
      fullPath: '/create-alert'
      preLoaderRoute: typeof AuthroutesCreateAlertImport
      parentRoute: typeof AuthroutesImport
    }
    '/_auth_routes/dashboard': {
      id: '/_auth_routes/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthroutesDashboardImport
      parentRoute: typeof AuthroutesImport
    }
    '/_auth_routes/profile': {
      id: '/_auth_routes/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthroutesProfileImport
      parentRoute: typeof AuthroutesImport
    }
    '/_auth_routes/job-alert/$id': {
      id: '/_auth_routes/job-alert/$id'
      path: '/job-alert/$id'
      fullPath: '/job-alert/$id'
      preLoaderRoute: typeof AuthroutesJobAlertIdImport
      parentRoute: typeof AuthroutesImport
    }
    '/_auth_routes/jobs/$id': {
      id: '/_auth_routes/jobs/$id'
      path: '/jobs/$id'
      fullPath: '/jobs/$id'
      preLoaderRoute: typeof AuthroutesJobsIdImport
      parentRoute: typeof AuthroutesImport
    }
  }
}

// Create and export the route tree

interface AuthroutesRouteChildren {
  AuthroutesCreateAlertRoute: typeof AuthroutesCreateAlertRoute
  AuthroutesDashboardRoute: typeof AuthroutesDashboardRoute
  AuthroutesProfileRoute: typeof AuthroutesProfileRoute
  AuthroutesJobAlertIdRoute: typeof AuthroutesJobAlertIdRoute
  AuthroutesJobsIdRoute: typeof AuthroutesJobsIdRoute
}

const AuthroutesRouteChildren: AuthroutesRouteChildren = {
  AuthroutesCreateAlertRoute: AuthroutesCreateAlertRoute,
  AuthroutesDashboardRoute: AuthroutesDashboardRoute,
  AuthroutesProfileRoute: AuthroutesProfileRoute,
  AuthroutesJobAlertIdRoute: AuthroutesJobAlertIdRoute,
  AuthroutesJobsIdRoute: AuthroutesJobsIdRoute,
}

const AuthroutesRouteWithChildren = AuthroutesRoute._addFileChildren(
  AuthroutesRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthroutesRouteWithChildren
  '/forgot-password': typeof ForgotPasswordRoute
  '/login': typeof LoginRoute
  '/reset-password': typeof ResetPasswordRoute
  '/signup': typeof SignupRoute
  '/verify-email': typeof VerifyEmailRoute
  '/create-alert': typeof AuthroutesCreateAlertRoute
  '/dashboard': typeof AuthroutesDashboardRoute
  '/profile': typeof AuthroutesProfileRoute
  '/job-alert/$id': typeof AuthroutesJobAlertIdRoute
  '/jobs/$id': typeof AuthroutesJobsIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthroutesRouteWithChildren
  '/forgot-password': typeof ForgotPasswordRoute
  '/login': typeof LoginRoute
  '/reset-password': typeof ResetPasswordRoute
  '/signup': typeof SignupRoute
  '/verify-email': typeof VerifyEmailRoute
  '/create-alert': typeof AuthroutesCreateAlertRoute
  '/dashboard': typeof AuthroutesDashboardRoute
  '/profile': typeof AuthroutesProfileRoute
  '/job-alert/$id': typeof AuthroutesJobAlertIdRoute
  '/jobs/$id': typeof AuthroutesJobsIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth_routes': typeof AuthroutesRouteWithChildren
  '/forgot-password': typeof ForgotPasswordRoute
  '/login': typeof LoginRoute
  '/reset-password': typeof ResetPasswordRoute
  '/signup': typeof SignupRoute
  '/verify-email': typeof VerifyEmailRoute
  '/_auth_routes/create-alert': typeof AuthroutesCreateAlertRoute
  '/_auth_routes/dashboard': typeof AuthroutesDashboardRoute
  '/_auth_routes/profile': typeof AuthroutesProfileRoute
  '/_auth_routes/job-alert/$id': typeof AuthroutesJobAlertIdRoute
  '/_auth_routes/jobs/$id': typeof AuthroutesJobsIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/forgot-password'
    | '/login'
    | '/reset-password'
    | '/signup'
    | '/verify-email'
    | '/create-alert'
    | '/dashboard'
    | '/profile'
    | '/job-alert/$id'
    | '/jobs/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/forgot-password'
    | '/login'
    | '/reset-password'
    | '/signup'
    | '/verify-email'
    | '/create-alert'
    | '/dashboard'
    | '/profile'
    | '/job-alert/$id'
    | '/jobs/$id'
  id:
    | '__root__'
    | '/'
    | '/_auth_routes'
    | '/forgot-password'
    | '/login'
    | '/reset-password'
    | '/signup'
    | '/verify-email'
    | '/_auth_routes/create-alert'
    | '/_auth_routes/dashboard'
    | '/_auth_routes/profile'
    | '/_auth_routes/job-alert/$id'
    | '/_auth_routes/jobs/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthroutesRoute: typeof AuthroutesRouteWithChildren
  ForgotPasswordRoute: typeof ForgotPasswordRoute
  LoginRoute: typeof LoginRoute
  ResetPasswordRoute: typeof ResetPasswordRoute
  SignupRoute: typeof SignupRoute
  VerifyEmailRoute: typeof VerifyEmailRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthroutesRoute: AuthroutesRouteWithChildren,
  ForgotPasswordRoute: ForgotPasswordRoute,
  LoginRoute: LoginRoute,
  ResetPasswordRoute: ResetPasswordRoute,
  SignupRoute: SignupRoute,
  VerifyEmailRoute: VerifyEmailRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth_routes",
        "/forgot-password",
        "/login",
        "/reset-password",
        "/signup",
        "/verify-email"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth_routes": {
      "filePath": "_auth_routes.tsx",
      "children": [
        "/_auth_routes/create-alert",
        "/_auth_routes/dashboard",
        "/_auth_routes/profile",
        "/_auth_routes/job-alert/$id",
        "/_auth_routes/jobs/$id"
      ]
    },
    "/forgot-password": {
      "filePath": "forgot-password.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/reset-password": {
      "filePath": "reset-password.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/verify-email": {
      "filePath": "verify-email.tsx"
    },
    "/_auth_routes/create-alert": {
      "filePath": "_auth_routes/create-alert.tsx",
      "parent": "/_auth_routes"
    },
    "/_auth_routes/dashboard": {
      "filePath": "_auth_routes/dashboard.tsx",
      "parent": "/_auth_routes"
    },
    "/_auth_routes/profile": {
      "filePath": "_auth_routes/profile.tsx",
      "parent": "/_auth_routes"
    },
    "/_auth_routes/job-alert/$id": {
      "filePath": "_auth_routes/job-alert.$id.tsx",
      "parent": "/_auth_routes"
    },
    "/_auth_routes/jobs/$id": {
      "filePath": "_auth_routes/jobs.$id.tsx",
      "parent": "/_auth_routes"
    }
  }
}
ROUTE_MANIFEST_END */
