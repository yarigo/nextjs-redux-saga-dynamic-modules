import { useCallback, useEffect } from 'react';
import { articleModule } from '@ducks/article';
import { ArticleActions } from '@ducks/article/reducers';
import { ArticleSelectors } from '@ducks/article/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { store } from 'src/store';

interface ReturnProps extends ReturnType<typeof ArticleSelectors.articles> {
  /**
   * Get articles list.
   */
  get: ActionCreatorFn<typeof ArticleActions.articlesRequest>;
  /**
   * Abort request.
   */
  abort: ActionCreatorFn<typeof ArticleActions.articlesAbort>;
}

interface UseArticles {
  (): ReturnProps;
}

// Articles list store.
export const useArticles: UseArticles = () => {
  const dispatch = useDispatch();
  const { request, success, failure } = useSelector(ArticleSelectors.articles);

  // Load module.
  useEffect(() => {
    store.reducerManager.add(articleModule);

    return () => {
      store.reducerManager.remove(articleModule);
    };
  }, []);

  const get = useCallback<ReturnProps['get']>(
    (payload) => dispatch(ArticleActions.articlesRequest(payload)),
    [dispatch]
  );

  const abort = useCallback<ReturnProps['abort']>(
    () => dispatch(ArticleActions.articlesAbort()),
    [dispatch]
  );

  return { get, abort, request, success, failure };
};
