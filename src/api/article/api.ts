import { articles } from 'data/article';

import { itemsPerPage } from 'src/settings';

import { IArticle } from './interface';
import { RespArticleItem } from './types';

export const article: IArticle = {
  async List(page) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        let offset = 0;

        if (page > 1) {
          offset = (page - 1) * itemsPerPage;
        }

        const result: RespArticleItem[] = [];

        articles
          .filter(
            (_, index) => index >= offset && index < offset + itemsPerPage
          )
          .map((item) => result.push(item));

        return resolve({
          items: result.length > 0 ? result : null,
          next: articles.length > page * itemsPerPage,
        });
      }, 500);
    });
  },

  async Get(entity) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        articles.map((item) => {
          if (item.id === entity) {
            return resolve(item);
          }
        });
      }, 500);
    });
  },
};
