export type RespCategoryArticleItem = {
	id: number;
	name: string;
	announce: string;
};

export type RespCategoryArticlesList = {
	id: number;
	name: string;
	items: RespCategoryArticleItem[] | null;
	next: boolean;
};

export type ReqCategoryArticles = {
	category: number;
	page: number;
};
