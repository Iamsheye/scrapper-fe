export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  isPremium: boolean;
  email: string;
  googleId: string;
  name: string;
  isVerified: boolean;
  isLoginAllowed: boolean;
};

export type IJobAlert = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  search: string;
  includeWords: string[];
  omitWords: string[];
  userId: string;
  jobs: IJobs[];
};

export type IJobs = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  link: string;
  hostSite: string;
  jobAlertId: string;
};
