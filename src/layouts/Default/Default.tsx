import { FunctionComponent, ReactElement } from 'react';
import Head from 'next/head';

import classes from 'public/assets/styles.module.css';

export type LayoutProps = {
	title?: string;
	description?: ReactElement;
};

const Default: FunctionComponent<LayoutProps> = (props) => {
	const { title, description, children } = props;

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

Default.defaultProps = {
	title: 'Мой блог',
};

export default Default;
