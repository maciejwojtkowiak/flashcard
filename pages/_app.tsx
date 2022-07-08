import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Store from '../store/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    router.events.on('routeChangeStart', () => setIsLoading(true));
    router.events.on('routeChangeComplete', () =>
      setIsLoading(false)
    );
  }, []);
  return (
    <Provider store={Store}>
      {isLoading && (
        <div className="h-screen grid place-items-center">
          <Bars height={100} width={100} color="#4ade80" />
        </div>
      )}
      {!isLoading && <Component {...pageProps} />}
    </Provider>
  );
}

export default MyApp;
