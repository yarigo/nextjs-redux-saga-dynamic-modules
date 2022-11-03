import { RespCategoryArticlesList } from 'src/api/category/types';

// Initial state properties.
export interface InitialState {
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
    success: RespCategoryArticlesList | null;
    /**
     * Failure.
     *
     * @default false
     */
    failure: boolean;
  };
}
