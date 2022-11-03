import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { storeWrapper } from 'src/store';

export default function App({ Component, pageProps }: AppProps) {
  const { store, props: wrappedProps } =
    storeWrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <Component {...wrappedProps} />
    </Provider>
  );
}
