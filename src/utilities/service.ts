import * as Koa from 'koa';

export interface IService {}

export interface IModelService extends IService {
  byId(id: string): Promise<any>;
  list(): Promise<any[]>;
  create(body: any): Promise<any>;
  delete(id: string): Promise<boolean>;
  update(id: string, body: any): Promise<any>;
}

export interface ISearchService extends IService {
  search(): Promise<any[]>;
}

export interface IJoinService<T, U> extends IService {
  get(tId: T, uId: U): Promise<U[]>;
}
