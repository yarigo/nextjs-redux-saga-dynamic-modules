import { FunctionComponent } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import classes from './styles.module.css';

export type PaginationProps = {
  url: string;
  page: number;
  next: boolean;
};

const Pagination: FunctionComponent<PaginationProps> = (props) => {
  const { url, page, next } = props;

  return (
    <div className={classes.pagination}>
      {page > 1 && (
        <span>
          <Link href={`${url}${page > 2 ? `?page=${page - 1}` : ''}`}>
            &larr;
          </Link>
        </span>
      )}

      {next && (
        <span>
          <Link href={`${url}?page=${page + 1}`}>&rarr;</Link>
        </span>
      )}
    </div>
  );
};

Pagination.propTypes = {
  url: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  next: PropTypes.bool.isRequired,
};

Pagination.defaultProps = {
  url: '',
  page: 0,
  next: false,
};

export default Pagination;
