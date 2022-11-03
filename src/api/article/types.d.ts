/**
 * Article category properties.
 */
export type RespArticleCategory = {
  id: number;
  name: string;
};

/**
 * Article data.
 */
export type RespArticle = {
  id: number;
  name: string;
  content: string;
  category: RespArticleCategory;
};

/**
 * Articles list item category properties.
 */
export type RespArticleItemCategory = {
  id: number;
  name: string;
};

/**
 * Articles list item properties.
 */
export type RespArticleItem = {
  id: number;
  name: string;
  announce: string;
  category: RespArticleItemCategory;
};

/**
 * Articles list data.
 */
export type RespArticlesList = {
  items: RespArticleItem[] | null;
  next: boolean;
};
