export type RespArticleCategory = {
	id: number;
	name: string;
};

export type RespArticle = {
	id: number;
	name: string;
	content: string;
	category: RespArticleCategory;
};

export type RespArticleItemCategory = {
	id: number;
	name: string;
};

export type RespArticleItem = {
	id: number;
	name: string;
	announce: string;
	category: RespArticleItemCategory;
};

export type RespArticlesList = {
	items: RespArticleItem[] | null;
	next: boolean;
};
