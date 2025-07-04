// src/types.ts
export type Report = {
    id: number;
    title: string;
    description: string;
    type: string;
    author: string;
    date: string;
    status: string;
    file?: string;
  };