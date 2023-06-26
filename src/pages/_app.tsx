// Global styles
import '@/styles/globals.css';
// Next components
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
// Redux components
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
// Local components
import IngredientModal from '@/components/ui/IngredientsPage/IngredientModal/IngredientModal';
import NavBar from '@/components/navbar/NavBar';
import MobileNavMenu from '@/components/navmenu/mobile/MobileNavMenu';
import SubCard from '@/components/ui/DrinkCard/SubCard/SubCard';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <Head>
            <link rel="shortcut icon" href="/images/favicon.ico" />
          </Head>
          <SubCard />
          <IngredientModal />
          <NavBar />
          <MobileNavMenu />
          <Component {...pageProps} className="page" key={router.asPath} />
        </div>
      </PersistGate>
    </Provider>
  );
}