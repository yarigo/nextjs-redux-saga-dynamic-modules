import { useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useArticles } from '@hooks/store/useArticles';
import classes from 'public/assets/styles.module.css';

import Pagination from 'src/components/common/Pagination';
import Layout from 'src/layouts/Default';
import { PublicWrapper } from 'src/ssr/PublicWrapper';
import { storeWrapper } from 'src/store';

interface PageProps {
  /**
   * Page number.
   */
  page: number;
}

const Page: NextPage<PageProps> = (props) => {
  const { page } = props;

  const { get, abort, request, success: articles, failure } = useArticles();

  useEffect(() => {
    get(page);

    return () => {
      abort();
    };
  }, [abort, get, page]);

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

      {request ? (
        <p>Загрузка...</p>
      ) : (
        articles &&
        articles.items &&
        articles.items.length > 0 && (
          <>
            <div className={classes.list}>
              {articles.items.map((item) => (
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

            <Pagination url='' page={page} next={articles.next} />
          </>
        )
      )}
    </Layout>
  );
};

export const getServerSideProps = storeWrapper.getServerSideProps((store) =>
  PublicWrapper(store, async (_store, ctx) => {
    const { query } = ctx;

    let page = 1;

    const pageQuery = query['page'];

    if (pageQuery && !Array.isArray(pageQuery)) {
      page = parseInt(pageQuery, 10);
    }

    return { props: { page } };
  })
);

export default Page;
