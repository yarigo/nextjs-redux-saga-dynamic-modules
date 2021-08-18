import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import 'public/assets/global.css';
import store from 'src/store';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}
export default MyApp;
