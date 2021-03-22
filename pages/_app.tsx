import { Provider } from 'react-redux';
import store from '../redux/store';

import "../styles/globals.css";
import Head from "next/head";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <title>Directions - Next.js</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyABF6S20JPVTeR78NHd7htMhBJ6EBqP2PE&libraries=places"></script>
      </Head>

      <Component {...pageProps} />

    </Provider>
  );
}

export default MyApp;
