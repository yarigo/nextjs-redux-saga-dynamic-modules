/**
 * Article properties.
 */
export type RespCategoryArticleItem = {
  id: number;
  name: string;
  announce: string;
};

/**
 * Articles list properties.
 */
export type RespCategoryArticlesList = {
  id: number;
  name: string;
  items: RespCategoryArticleItem[] | null;
  next: boolean;
};

/**
 * Articles list by category.
 */
export type ReqCategoryArticles = {
  category: number;
  page: number;
};
