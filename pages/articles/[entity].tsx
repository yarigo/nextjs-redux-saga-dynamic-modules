import { useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useArticle } from '@hooks/store/useArticle';
import classes from 'public/assets/styles.module.css';

import Layout from 'src/layouts/Default';
import { PublicWrapper } from 'src/ssr/PublicWrapper';
import { storeWrapper } from 'src/store';

interface PageProps {
  /**
   * Article id.
   */
  entity: number;
}

const Page: NextPage<PageProps> = (props) => {
  const { entity } = props;

  const { get, abort, request, success: article, failure } = useArticle();

  useEffect(() => {
    get(entity);

    return () => {
      abort();
    };
  }, [abort, entity, get]);

  return (
    <Layout>
      <Link href='/'>На главную</Link>

      {failure && <h3>Публикация не найдена.</h3>}

      {request ? (
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

export const getServerSideProps = storeWrapper.getServerSideProps((store) =>
  PublicWrapper(store, async (_store, ctx) => {
    const { query } = ctx;

    let entity = -1;

    const entityQuery = query['entity'];

    if (entityQuery && !Array.isArray(entityQuery)) {
      entity = parseInt(entityQuery, 10);
    }

    return { props: { entity } };
  })
);

export default Page;
