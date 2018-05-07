import * as Koa from 'koa';

export interface IService {
  byId(id: string): Promise<any>;
  list(): Promise<any[]>;
  search(): Promise<any[]>;
  create(body: any): Promise<any>;
  delete(id: string): Promise<boolean>;
  update(id: string, body: any): Promise<any>;
}
