import { RespArticle, RespArticlesList } from './types';

export interface IArticle {
  /**
   * Articles list.
   */
  List: (page: number) => Promise<RespArticlesList>;

  /**
   * Article by its id.
   */
  Get: (entity: number) => Promise<RespArticle>;
}
