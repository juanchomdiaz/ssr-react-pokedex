import Head from 'next/head';

import PokedexState from '@contexts/pokedex/PokedexState';
import AppLayout from '@components/layout/AppLayout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="favicon.ico" />

        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossorigin="anonymous"
        />
      </Head>
      <PokedexState>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </PokedexState>
    </>
  );
}

export default MyApp;
