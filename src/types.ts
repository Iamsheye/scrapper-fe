export type JobAlert = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  search: string;
  includeWords: string[];
  omitWords: string[];
  userId: string;
  // TODO: Add Jobs type
  jobs: any[];
};
