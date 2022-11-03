import { useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useCategory } from '@hooks/store/useCategory';
import classes from 'public/assets/styles.module.css';

import Pagination from 'src/components/common/Pagination';
import Layout from 'src/layouts/Default';
import { PublicWrapper } from 'src/ssr/PublicWrapper';
import { storeWrapper } from 'src/store';

interface PageProps {
  /**
   * Category id.
   */
  entity: number;
  /**
   * Page number.
   */
  page: number;
}

const Page: NextPage<PageProps> = (props) => {
  const { entity, page } = props;

  const { get, abort, request, success: category, failure } = useCategory();

  useEffect(() => {
    get({ category: entity, page });

    return () => {
      abort();
    };
  }, [abort, entity, get, page]);

  return (
    <Layout>
      <Link href='/'>На главную</Link>

      {failure && <h3>Публикации не найдены.</h3>}

      {request ? <p>Загрузка...</p> : category && <h1>{category.name}</h1>}

      {category && category.items && category.items.length > 0 ? (
        <>
          <div className={classes.list}>
            {category.items.map((article) => (
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

          <Pagination
            url={`/categories/${entity}`}
            page={page}
            next={category.next}
          />
        </>
      ) : null}
    </Layout>
  );
};

export const getServerSideProps = storeWrapper.getServerSideProps((store) =>
  PublicWrapper(store, async (_store, ctx) => {
    const { query } = ctx;

    let entity = -1;
    let page = 1;

    const entityQuery = query['entity'];

    if (entityQuery && !Array.isArray(entityQuery)) {
      entity = parseInt(entityQuery, 10);
    }

    const pageQuery = query['page'];

    if (pageQuery && !Array.isArray(pageQuery)) {
      page = parseInt(pageQuery, 10);
    }

    return { props: { entity, page } };
  })
);

export default Page;
