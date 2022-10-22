import { StringLiteral } from "typescript";

export interface categoryTypes {
  createAt: string;
  id: string;
  name: string;
  updateAt: string;
  slug: string;
}

export interface authorTypes {
  createAt: string;
  id: string;
  name: string;
  updateAt: string;
  email: string;
}

export interface tagTypes {
  createAt: string;
  id: string;
  name: string;
  updateAt: string;
}

export interface relationType {
  category: string;
  author: string;
  tag: string[],
}
