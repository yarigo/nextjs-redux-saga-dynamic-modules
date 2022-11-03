import { GetServerSidePropsResult } from 'next';
import merge from 'deepmerge';

interface MergeServerSideResult {
  (
    ...data: GetServerSidePropsResult<{ [key: string]: any }>[]
  ): GetServerSidePropsResult<{ [key: string]: any }>;
}

export const mergeServerSideResult: MergeServerSideResult = (...data) => {
  let result: GetServerSidePropsResult<{ [key: string]: any }> = {
    props: {},
  };
  const BreakException = {};

  try {
    data.map((param) => {
      if ((param as any).redirect || (param as any).notFound) {
        result = param;
        throw BreakException;
      }

      result = merge(
        result,
        param as { [key: string]: any }
      ) as GetServerSidePropsResult<{ [key: string]: any }>;
    });
  } catch (err) {
    if (err !== BreakException && process.env.NODE_ENV === 'development') {
      console.error(err);
    }
  }

  return result;
};
