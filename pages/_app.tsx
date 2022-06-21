import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Store from "../src/store/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    router.events.on("routeChangeStart", () => setIsLoading(true));
    router.events.on("routeChangeComplete", () => setIsLoading(false));
  }, []);
  return (
    <Provider store={Store}>
      {isLoading && <div>Loading</div>}
      {!isLoading && <Component {...pageProps} />}
    </Provider>
  );
}

export default MyApp;
