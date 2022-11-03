import { FunctionComponent, memo, ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import classes from 'public/assets/styles.module.css';

export type LayoutProps = {
  title?: string;
  description?: ReactElement;
  children?: ReactNode;
};

const Layout: FunctionComponent<LayoutProps> = (props) => {
  const { title = 'Мой блог', description, children } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {description && <div className={classes.description}>{description}</div>}

      <main className={classes.main}>{children}</main>
    </>
  );
};

Layout.displayName = 'Layout';

export default memo(Layout);
