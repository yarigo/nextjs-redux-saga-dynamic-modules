import {
	RespArticle,
	RespArticleItem,
	RespArticlesList,
} from 'src/ducks/article/types';
import { articles } from 'data/article';
import { itemsPerPage } from 'src/settings';

interface IArticle {
	List: (page: number) => Promise<RespArticlesList>;

	Get: (entity: number) => Promise<RespArticle>;
}

class CArticle implements IArticle {
	async List(page: number) {
		return new Promise<RespArticlesList>((resolve, _reject) => {
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
	}

	async Get(entity: number) {
		return new Promise<RespArticle>((resolve, _reject) => {
			setTimeout(() => {
				articles.map((item) => {
					if (item.id === entity) {
						return resolve(item);
					}
				});
			}, 500);
		});
	}
}

export const Article = new CArticle();
