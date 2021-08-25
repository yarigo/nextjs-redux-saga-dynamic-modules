import type { NextPage } from 'next';
import { FunctionComponent, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';

import { getArticle } from 'src/ducks/article/actions';
import {
	article,
	getArticleRequest,
	getArticleFailure,
} from 'src/ducks/article/selectors';
import Layout from 'src/layouts/Default';
import classes from 'public/assets/styles.module.css';
import {
	IItemArticleAwareState,
	itemArticleModule,
} from 'src/ducks/article/module';

const mapStateToProps = (state: IItemArticleAwareState) => ({
	article: article(state),
	request: getArticleRequest(state),
	failure: getArticleFailure(state),
});

const mapDispatchToProps = {
	requestGetArticle: getArticle.request,
	cancelGetArticle: getArticle.cancel,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface PageProps extends ConnectedProps<typeof connector> {}

const Page: NextPage<PageProps> = (props) => {
	const { requestGetArticle, cancelGetArticle, article, request, failure } =
		props;

	const router = useRouter();

	useEffect(() => {
		return () => {
			cancelGetArticle();
		};
	}, []);

	useEffect(() => {
		const entity = router.query['entity'];

		if (entity && !Array.isArray(entity)) {
			requestGetArticle(parseInt(entity, 10));
		}
	}, [router.query['entity']]);

	return (
		<Layout>
			<Link href='/'>На главную</Link>

			{failure && <h3>Публикация не найдена.</h3>}

			{request !== null ? (
				<p>Загрузка...</p>
			) : (
				article && (
					<div>
						<h1>{article.name}</h1>
						<div dangerouslySetInnerHTML={{ __html: article.content }} />
						<div className={classes.category}>
							<Link href={`/categories/${article.category.id}`}>
								{article.category.name}
							</Link>
						</div>
					</div>
				)
			)}
		</Layout>
	);
};

const ConnectedPage = connector(Page);

const Dynamic: FunctionComponent = (_props) => {
	return (
		<DynamicModuleLoader modules={[itemArticleModule()]}>
			<ConnectedPage />
		</DynamicModuleLoader>
	);
};

export default Dynamic;
