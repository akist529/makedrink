// Global styles
import '@/styles/globals.css';
// React components
import { useState, useEffect } from 'react';
// Next components
import type { AppProps } from 'next/app';
// Redux components
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store';
// Local components
import IngredientModal from '@/components/ui/IngredientsPage/IngredientModal/IngredientModal';
import NavBar from '@/components/navbar/NavBar';
import NavMenu from '@/components/navmenu/NavMenu';

export default function App({ Component, pageProps }: AppProps) {
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
      const onResize = () => {
          if (window.innerWidth >= 768) {
              setShowMobileNav(false);
          } else {
              setShowMobileNav(true);
          }
      }

      window.addEventListener('resize', onResize);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <IngredientModal />
          <NavBar />
          { showMobileNav && <NavMenu /> }
          <Component {...pageProps} className="page" />
        </div>
      </PersistGate>
    </Provider>
  );
}