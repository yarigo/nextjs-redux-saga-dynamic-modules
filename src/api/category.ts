import { categories } from 'data/category';
import {
	ReqCategoryArticles,
	RespCategoryArticleItem,
	RespCategoryArticlesList,
} from 'src/ducks/category/types';
import { itemsPerPage } from 'src/settings';

interface ICategory {
	List: (props: ReqCategoryArticles) => Promise<RespCategoryArticlesList>;
}

class CCategory implements ICategory {
	async List(props: ReqCategoryArticles) {
		return new Promise<RespCategoryArticlesList>((resolve, reject) => {
			setTimeout(() => {
				let offset = 0;

				if (props.page > 1) {
					offset = (props.page - 1) * itemsPerPage;
				}

				let result: RespCategoryArticleItem[] = [];

				const category = categories.filter(
					(item) => item.id === props.category
				);

				if (category.length !== 1) {
					return reject('404 not found');
				}

				category.map((item) =>
					item.articles
						.filter(
							(_, index) => index >= offset && index < offset + itemsPerPage
						)
						.map((item) => result.push(item))
				);

				return resolve({
					id: category[0].id,
					name: category[0].name,
					items: result,
					next: category[0].articles.length > props.page * itemsPerPage,
				});
			}, 500);
		});
	}
}

export const Category = new CCategory();
