import { useCallback, useEffect } from 'react';
import { articleModule } from '@ducks/article';
import { categoryModule } from '@ducks/category';
import { CategoryActions } from '@ducks/category/reducers';
import { CategorySelectors } from '@ducks/category/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { store } from 'src/store';

interface ReturnProps extends ReturnType<typeof CategorySelectors.articles> {
  /**
   * Get article.
   */
  get: ActionCreatorFn<typeof CategoryActions.categoryRequest>;
  /**
   * Abort request.
   */
  abort: ActionCreatorFn<typeof CategoryActions.categoryAbort>;
}

interface UseCategory {
  (): ReturnProps;
}

// Category store.
export const useCategory: UseCategory = () => {
  const dispatch = useDispatch();
  const { request, success, failure } = useSelector(CategorySelectors.articles);

  // Load module.
  useEffect(() => {
    store.reducerManager.add(categoryModule);

    return () => {
      store.reducerManager.remove(categoryModule);
    };
  }, []);

  const get = useCallback<ReturnProps['get']>(
    (payload) => dispatch(CategoryActions.categoryRequest(payload)),
    [dispatch]
  );

  const abort = useCallback<ReturnProps['abort']>(
    () => dispatch(CategoryActions.categoryAbort()),
    [dispatch]
  );

  return { get, abort, request, success, failure };
};
