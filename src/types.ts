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
