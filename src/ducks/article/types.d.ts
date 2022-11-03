import { RespArticle, RespArticlesList } from 'src/api/article/types';

// Initial state properties.
export interface InitialState {
  /**
   * Article data.
   *
   * @default null
   */
  article: {
    /**
     * Request.
     *
     * @default false
     */
    request: boolean;
    /**
     * Success.
     *
     * @default null
     */
    success: RespArticle | null;
    /**
     * Failure.
     *
     * @default false
     */
    failure: boolean;
  };
  /**
   * Articles list.
   *
   * @default null
   */
  articles: {
    /**
     * Request.
     *
     * @default false
     */
    request: boolean;
    /**
     * Success.
     *
     * @default null
     */
    success: RespArticlesList | null;
    /**
     * Failure.
     *
     * @default false
     */
    failure: boolean;
  };
}
