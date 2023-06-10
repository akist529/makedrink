// Page styles
import styles from '@/styles/Home.module.scss';
// React components
import { useState, useEffect } from 'react';
// Next components
import type { NextPage } from 'next';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
// Local components
import ScrollButton from '@/components/buttons/ScrollButton/ScrollButton';
import Footer from '@/components/footer/Footer';
import LandingSection from '@/components/ui/HomePage/LandingSection/LandingSection';
import DrinkSection from '@/components/ui/HomePage/DrinkSection/DrinkSection';
import FormSection from '@/components/ui/HomePage/FormSection/FormSection';
// Type interfaces
import { DrinkInfo } from '@/types/index';

const HomePage: NextPage = () => {
  const [drinkType, setDrinkType] = useState('');
  const [drinkError, setDrinkError] = useState('');
  const [randomDrink, setRandomDrink] = useState({} as DrinkInfo);
  const possibleDrinks = useSelector((state: RootState) => state.drinks.possible);
  const dispatch = useDispatch();

  function getRandomDrink () {
    const keyLength = Object.keys(possibleDrinks).length;
    
    if (!keyLength) {
      setDrinkError('You don\'t have enough ingredients to make a drink');
    } else {
      setDrinkError('');

      const key = Object.keys(possibleDrinks)[Math.floor(Math.random() * keyLength)];
      const index = Math.floor(Math.random() * possibleDrinks[key].length);
      const drink = possibleDrinks[key][index];

      if (drink === randomDrink) {
        getRandomDrink();
      } else {
        setRandomDrink(drink);
      }
    }
  }

  useEffect(() => {
    const id = 'form';
    const yOffset = -100;
    const element = document.getElementById(id);

    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }, [drinkType, dispatch]);

  useEffect(() => {
    const id = 'drink';
    const yOffset = -100;
    const element = document.getElementById(id);

    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }, [randomDrink]);

  return (
    <main className={styles.HomePage}>
      <LandingSection 
        getRandomDrink={getRandomDrink}
        drinkType={drinkType}
        setDrinkType={setDrinkType}
        drinkError={drinkError}
        setDrinkError={setDrinkError} />
      { (drinkType || Object.keys(randomDrink).length > 0) && 
          <ScrollButton link='#drink' /> }
      { Object.keys(randomDrink).length > 0 && 
        <DrinkSection 
          randomDrink={randomDrink} 
          getRandomDrink={getRandomDrink} /> }
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