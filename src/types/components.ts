export type Component = {
  id: number;
  name: string;
  description?: string;
  code: string;
  userId?: string;
  createdAt?: string;
};

export type Components = Component[];
