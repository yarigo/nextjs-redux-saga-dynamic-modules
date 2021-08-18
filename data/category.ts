import { numArticles, numCategories } from 'src/settings';

export type CategoryArticle = {
	id: number;
	name: string;
	announce: string;
};

export type Category = {
	id: number;
	name: string;
	articles: CategoryArticle[];
};

const announce = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;

export const categories = ((): Category[] => {
	const result: Category[] = [];

	let articleID = 0;

	for (let i = 0; i < numCategories; i++) {
		const articles: CategoryArticle[] = [];

		for (let k = 1; k <= numArticles / numCategories; k++) {
			articles.push({
				id: ++articleID,
				name: `Article name ${articleID}`,
				announce,
			});
		}

		result.push({
			id: i + 1,
			name: `Category name ${i + 1}`,
			articles,
		});
	}

	return result;
})();
