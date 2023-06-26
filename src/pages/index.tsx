// Page styles
import styles from '@/styles/Home.module.scss';
// React components
import { useState, useEffect } from 'react';
// Next components
import type { NextPage } from 'next';
import Head from 'next/head';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
// Local components
import ScrollButton from '@/components/buttons/ScrollButton/ScrollButton';
import Footer from '@/components/footer/Footer';
import LandingSection from '@/components/ui/HomePage/LandingSection/LandingSection';
import DrinkSection from '@/components/ui/HomePage/DrinkSection/DrinkSection';
import FormSection from '@/components/ui/HomePage/FormSection/FormSection';

const HomePage: NextPage = () => {
  const [drinkType, setDrinkType] = useState('');
  const [drinkError, setDrinkError] = useState('');
  const dispatch = useDispatch();
  const randomDrink = useSelector((state: RootState) => state.drinks.random);

  useEffect(() => {
    const id = 'form';
    const yOffset = -100;
    const element = document.getElementById(id);

    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }, [drinkType, dispatch]);

  return (
    <main className={['page', styles.HomePage].join(' ')}>
      <Head>
        <title>MakeDrink</title>
      </Head>
      <LandingSection 
        drinkType={drinkType}
        setDrinkType={setDrinkType}
        drinkError={drinkError}
        setDrinkError={setDrinkError} />
      { (drinkType || Object.keys(randomDrink).length > 0) && 
          <ScrollButton link='#drink' /> }
      { Object.keys(randomDrink).length > 0 && 
        <DrinkSection /> }
      { (drinkType && Object.keys(randomDrink).length > 0) && 
          <ScrollButton link='#form' /> }
      { drinkType && 
        <FormSection 
          drinkType={drinkType} /> }
      <Footer />
    </main>
  );
}

export default HomePage;