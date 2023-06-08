// Page styles
import styles from '@/styles/Home.module.scss';
// React components
import { useState, useEffect } from 'react';
// Next components
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
// Local components
import RandomDrink from '@/components/ui/HomePage/RandomDrink/RandomDrink';
import IngredientForm from '@/components/ui/HomePage/IngredientForm/IngredientForm';
import DrinkTypes from '@/components/ui/HomePage/DrinkTypes/DrinkTypes';
import ScrollButton from '@/components/buttons/ScrollButton/ScrollButton';
import MakeDrinkButton from '@/components/buttons/MakeDrinkButton/MakeDrinkButton';
import SelectIngredientsButton from '@/components/buttons/SelectIngredientsButton/SelectIngredientsButton';
import Footer from '@/components/footer/Footer';
// Type interfaces
import { DrinkInfo } from '@/types/index';

const HomePage: NextPage = () => {
  const [drinkType, setDrinkType] = useState('');
  const [drinkError, setDrinkError] = useState('');
  const [randomDrink, setRandomDrink] = useState({} as DrinkInfo);
  const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
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

  function findIngredientType(type: string) {
    if (storedIngredients.hasOwnProperty(type)) {
      return true;
    } else {
      return false;
    }
  }

  function updateWidth (e: HTMLImageElement) {
    e.width = (e.height / e.naturalHeight) * e.naturalWidth;
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
      <section id="landing" className={styles.landingSection}>
        <header>
          <h1>What Can I Make?</h1>
        </header>
        <SelectIngredientsButton />
        <span>Then...</span>
        <nav>
          <div onClick={() => getRandomDrink()}>
            <MakeDrinkButton />
          </div>
          <h2>Or...</h2>
          <DrinkTypes 
            drinkType={drinkType} 
            setDrinkType={setDrinkType} 
            drinkError={drinkError} 
            setDrinkError={setDrinkError} />
        </nav>
        <strong className={drinkError ? styles.error : ''}>{drinkError}</strong>
      </section>
      { (drinkType || Object.keys(randomDrink).length > 0) && 
        <nav>
          <ScrollButton link='#drink' />
        </nav> }
      { Object.keys(randomDrink).length > 0 && 
        <section id='drink' className={styles.drinkSection}>
          { (Object.keys(randomDrink).length > 0) && 
            <RandomDrink 
              randomDrink={randomDrink} 
              getRandomDrink={getRandomDrink} /> }
        </section> }
      { (drinkType && Object.keys(randomDrink).length > 0) && 
        <nav>
          <ScrollButton link='#form' />
        </nav> }
      { drinkType && <section id='form' className={styles.formSection}>
        { Object.keys(storedIngredients).length > 0 && 
        <form>
          { (drinkType === 'cocktail') && 
          <>
            { findIngredientType('liquor') && 
              <IngredientForm ingredientType='liquor' /> }
            { findIngredientType('liqueur') && 
              <IngredientForm ingredientType='liqueur' /> }
            { findIngredientType('wine') && 
              <IngredientForm ingredientType='wine' /> }
            { findIngredientType('other') && 
              <IngredientForm ingredientType='other' /> }
          </> }
          { drinkType && 
          <>
            { findIngredientType('carbonated') && 
              <IngredientForm ingredientType='carbonated' /> }
            { findIngredientType('juice') && 
              <IngredientForm ingredientType='juice' /> }
            { findIngredientType('mixer') && 
              <IngredientForm ingredientType='mixer' /> }
          </> }
        </form> }
        { (drinkType && Object.keys(storedIngredients).length > 0) && 
        <Link href='/drinks/filtered'>
          <button className={styles.seeDrinksBtn}>
            <span>See Drinks</span>
            <Image 
              alt='See Drinks' 
              src={require('/public/images/ui/cocktail.webp')} 
              width="64" 
              height="64" />
          </button>
        </Link> }
      </section> }
      <Footer />
    </main>
  );
}

export default HomePage;