import type { NextPage } from 'next';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';

import { getArticles } from 'src/ducks/article/actions';
import {
	articles,
	getArticlesListFailure,
	getArticlesListRequest,
} from 'src/ducks/article/selectors';
import { RespArticleItem } from 'src/ducks/article/types';
import Layout from 'src/layouts/Default';
import classes from 'public/assets/styles.module.css';
import Pagination from 'src/components/common/Pagination';
import {
	IListArticlesAwareState,
	listArticlesModule,
} from 'src/ducks/article/module';

const mapStateToProps = (state: IListArticlesAwareState) => ({
	articles: articles(state),
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
	const { requestGetArticles, cancelGetArticles, articles, request, failure } =
		props;

	const [items, setItems] = useState<RespArticleItem[] | null>(null);
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

	useEffect(() => {
		if (page > 0) {
			requestGetArticles(page);
		}
	}, [page]);

	useEffect(() => {
		if (articles) {
			setItems(articles.items);
			setNext(articles.next);
		}
	}, [articles]);

	return (
		<Layout
			description={
				<>
					<h1>Мой блог</h1>
					<p>
						Это учебный пример показывающий работу динамических модулей redux и
						saga.
					</p>
					<p>
						Данное приложение работает на стороне клиента (все запросы идут от
						клиента).
					</p>
				</>
			}
		>
			{failure && <h3>Ошибка получения списка публикаций.</h3>}

			{Boolean(request) ? (
				<p>Загрузка...</p>
			) : (
				items &&
				items.length > 0 && (
					<>
						<div className={classes.list}>
							{items.map((item) => (
								<article key={item.id} className={classes.announce}>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img alt={item.name} src='/assets/cat.jpg' />
									<header>
										<Link href={`/articles/${item.id}`}>{item.name}</Link>
									</header>
									<div>{item.announce}</div>
									<div>
										<Link href={`/categories/${item.category.id}`}>
											{item.category.name}
										</Link>
									</div>
								</article>
							))}
						</div>

						<Pagination url='' page={page} next={next} />
					</>
				)
			)}
		</Layout>
	);
};

const ConnectedPage = connector(Page);

const Dynamic: FunctionComponent = (_props) => {
	return (
		<DynamicModuleLoader modules={[listArticlesModule()]}>
			<ConnectedPage />
		</DynamicModuleLoader>
	);
};

export default Dynamic;
