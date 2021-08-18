import type { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { getArticles } from 'src/ducks/category/actions';
import {
	articles,
	getArticlesListRequest,
	getArticlesListFailure,
} from 'src/ducks/category/selectors';
import Layout from 'src/layouts/Default';
import { RootState } from 'src/store';
import classes from 'public/assets/styles.module.css';
import { RespCategoryArticleItem } from 'src/ducks/category/types';
import Pagination from 'src/components/common/Pagination';

const mapStateToProps = (state: RootState) => ({
	category: articles(state),
	request: getArticlesListRequest(state),
	failure: getArticlesListFailure(state),
});

const mapDispatchToProps = {
	requestGetArticles: getArticles.request,
	cancelGetArticles: getArticles.cancel,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface PageProps extends ConnectedProps<typeof connector> {}

const Page: NextPage<PageProps> = (props) => {
	const { requestGetArticles, cancelGetArticles, category, request, failure } =
		props;

	const [items, setItems] = useState<RespCategoryArticleItem[] | null>(null);
	const [entity, setEntity] = useState<number>(-1);
	const [page, setPage] = useState<number>(-1);
	const [next, setNext] = useState<boolean>(false);

	const router = useRouter();

	useEffect(() => {
		return () => {
			cancelGetArticles();
		};
	}, []);

	useMemo(() => {
		const query = router.query['page'];

		if (typeof query !== 'undefined') {
			if (Array.isArray(query)) {
				setPage(parseInt(query[0], 10));
			} else {
				setPage(parseInt(query, 10));
			}
		} else {
			setPage(1);
		}
	}, [router.query['page']]);

	useMemo(() => {
		const query = router.query['entity'];

		if (query && !Array.isArray(query)) {
			setEntity(parseInt(query, 10));
		} else if (entity >= 0) {
			setEntity(-1);
		}
	}, [router.query['entity']]);

	useEffect(() => {
		if (entity > 0 && page > 0) {
			requestGetArticles({ category: entity, page });
		} else if (items !== null) {
			setItems(null);
		}
	}, [entity, page]);

	useEffect(() => {
		if (failure) {
			setItems(null);
			setNext(false);
		} else if (!request && category) {
			setItems(category.items);
			setNext(category.next);
		}
	}, [category, failure]);

	return (
		<Layout>
			<Link href='/'>На главную</Link>

			{failure && <h3>Публикации не найдены.</h3>}

			{Boolean(request) ? (
				<p>Загрузка...</p>
			) : (
				category && <h1>{category.name}</h1>
			)}

			{!Boolean(request) && items && items.length > 0 ? (
				<>
					<div className={classes.list}>
						{items.map((article) => (
							<article key={article.id} className={classes.announce}>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img alt={article.name} src='/assets/cat.jpg' />
								<header>
									<Link href={`/articles/${article.id}`}>{article.name}</Link>
								</header>
								<div>{article.announce}</div>
							</article>
						))}
					</div>

					<Pagination url={`/categories/${entity}`} page={page} next={next} />
				</>
			) : null}
		</Layout>
	);
};

export default connector(Page);
