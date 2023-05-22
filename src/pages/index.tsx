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
import { clearSelected } from '@/store/slices/ingredients.slice';
// Local components
import RandomDrink from '@/components/ui/RandomDrink/RandomDrink';
import IngredientForm from '@/components/ui/IngredientForm/IngredientForm';
import DrinkTypes from '@/components/ui/DrinkTypes/DrinkTypes';
import ScrollButton from '@/components/buttons/ScrollButton/ScrollButton';
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

    document.getElementById('drink')?.scrollIntoView({ behavior: 'smooth' });
  }

  function findIngredientType(type: string) {
    if (storedIngredients.hasOwnProperty(type)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    dispatch(clearSelected());
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
  }, [drinkType, dispatch]);

  return (
    <main className={styles.Home}>
      <section id="landing" className={styles.landingSection}>
        <header>
          <h1>What Can I Make?</h1>
        </header>
        <Link href="/ingredients">
          <button className={styles.selectBtn}>
            <div>
              <Image alt='Select Ingredients' src={require('/public/images/ui/carbonated.webp')} height="32" />
              <Image alt='Select Ingredients' src={require('/public/images/ui/liqueurs.webp')} height="32" />
              <Image alt='Select Ingredients' src={require('/public/images/ui/mixers.webp')} height="32" />
              <Image alt='Select Ingredients' src={require('/public/images/ui/other.webp')} height="32" />
              <Image alt='Select Ingredients' src={require('/public/images/ui/spirits.webp')} height="32" />
            </div>
            <span>Select Your Ingredients</span>
          </button>
        </Link>
        <span>Then...</span>
        <nav>
          <button className={styles.randomBtn} onClick={() => getRandomDrink()}>
            <Image alt="Make a Drink" src={require('/public/images/ui/select-ingredients.webp')} width="48" height="48" />
            <span>Make A Drink!</span>
          </button>
          <h2>Or...</h2>
          <DrinkTypes drinkType={drinkType} setDrinkType={setDrinkType} drinkError={drinkError} setDrinkError={setDrinkError} />
        </nav>
        <strong className={drinkError ? styles.error : ''}>{drinkError}</strong>
      </section>
      { (drinkType || Object.keys(randomDrink).length > 0) && <nav>
        <ScrollButton link='#drink' />
      </nav> }
      { randomDrink && <section className={styles.drinkSection}>
        { (Object.keys(randomDrink).length > 0) && 
          <RandomDrink randomDrink={randomDrink} getRandomDrink={getRandomDrink} /> }
        <span className={styles.drinkAnchor} id='drink'></span>
      </section> }
      { (drinkType && Object.keys(randomDrink).length > 0) && <nav>
        <ScrollButton link='#form' />
      </nav> }
      <section className={styles.formSection}>
        { Object.keys(storedIngredients).length > 0 && 
        <form>
          { (drinkType === 'cocktail') && 
          <>
            { findIngredientType('liquor') && 
              <IngredientForm ingredientType='liquor' drinkType='cocktail' /> }
            { findIngredientType('liqueur') && 
              <IngredientForm ingredientType='liqueur' drinkType='cocktail' /> }
            { findIngredientType('wine') && 
              <IngredientForm ingredientType='wine' drinkType='cocktail' /> }
            { findIngredientType('other') && 
              <IngredientForm ingredientType='other' drinkType='cocktail' /> }
          </> }
          { drinkType && 
          <>
            { findIngredientType('carbonated') && 
              <IngredientForm ingredientType='carbonated' drinkType='cocktail' /> }
            { findIngredientType('juice') && 
              <IngredientForm ingredientType='juice' drinkType='cocktail' /> }
            { findIngredientType('mixer') && 
              <IngredientForm ingredientType='mixer' drinkType='cocktail' /> }
          </> }
        </form> }
        { (drinkType && Object.keys(storedIngredients).length > 0) && 
        <Link href='/drinks'>
          <button className={styles.seeDrinksBtn}>
            <span>See Drinks</span>
            <Image alt='See Drinks' src={require('/public/images/ui/cocktail.webp')} width="64" height="64" />
          </button>
        </Link> }
        <span className={styles.formAnchor} id='form'></span>
      </section>
    </main>
  )
}

export default HomePage;