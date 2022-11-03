import { ReqCategoryArticles, RespCategoryArticlesList } from './types';

export interface ICategory {
  /**
   * Categories list.
   */
  List: (props: ReqCategoryArticles) => Promise<RespCategoryArticlesList>;
}
