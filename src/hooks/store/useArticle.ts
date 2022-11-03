import { useCallback, useEffect } from 'react';
import { articleModule } from '@ducks/article';
import { ArticleActions } from '@ducks/article/reducers';
import { ArticleSelectors } from '@ducks/article/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { store } from 'src/store';

interface ReturnProps extends ReturnType<typeof ArticleSelectors.article> {
  /**
   * Get article.
   */
  get: ActionCreatorFn<typeof ArticleActions.articleRequest>;
  /**
   * Abort request.
   */
  abort: ActionCreatorFn<typeof ArticleActions.articleAbort>;
}

interface UseArticle {
  (): ReturnProps;
}

// Article store.
export const useArticle: UseArticle = () => {
  const dispatch = useDispatch();
  const { request, success, failure } = useSelector(ArticleSelectors.article);

  // Load module.
  useEffect(() => {
    store.reducerManager.add(articleModule);

    return () => {
      store.reducerManager.remove(articleModule);
    };
  }, []);

  const get = useCallback<ReturnProps['get']>(
    (payload) => dispatch(ArticleActions.articleRequest(payload)),
    [dispatch]
  );

  const abort = useCallback<ReturnProps['abort']>(
    () => dispatch(ArticleActions.articleAbort()),
    [dispatch]
  );

  return { get, abort, request, success, failure };
};
