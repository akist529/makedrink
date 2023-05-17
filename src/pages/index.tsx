// Page styles
import styles from '@/styles/Home.module.scss';
// React components
import { useState, useEffect, useRef } from 'react';
// Next components
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetAllDrinkInfoQuery } from '@/store/api/api';
import { clearSelected } from '@/store/slices/ingredients.slice';
// Local components
import RandomDrink from '@/components/ui/RandomDrink/RandomDrink';
import IngredientFilter from '@/components/ui/IngredientFilter/IngredientFilter';
import IngredientForm from '@/components/ui/IngredientForm/IngredientForm';
import DrinkTypes from '@/components/ui/DrinkTypes/DrinkTypes';
// Type interfaces
import { DrinkInfo, Item } from '@/types/index';

const HomePage: NextPage = () => {
  const [drinkType, setDrinkType] = useState('')
  const [drinkError, setDrinkError] = useState(false)
  const [randomDrink, setRandomDrink] = useState({} as DrinkInfo)
  const possibleDrinks = useSelector((state: RootState) => state.drinks.possible)
  const dispatch = useDispatch();

  function getRandomDrink () {
    const keyLength = Object.keys(possibleDrinks).length;
    
    if (!keyLength) {
      setDrinkError(true);
    } else {
      setDrinkError(false);

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
    dispatch(clearSelected());
  }, [drinkType, dispatch])

  return (
    <main className={styles.Home}>
      <section className={styles.landingSection}>
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
          <div>
            <DrinkTypes drinkType={drinkType} setDrinkType={setDrinkType} />
          </div>
        </nav>
      </section>
      <section className={styles.drinkSection}>
        { (Object.keys(randomDrink).length > 0) && 
          <RandomDrink randomDrink={randomDrink} /> }
        { drinkError &&
          <strong>{ 'You don\'t have enough ingredients to make a drink.' }</strong> }
      </section>
      <section className={styles.formSection}>
        <form>
          { (drinkType === 'cocktail') && 
          <>
            <IngredientForm ingredientType='liquor' drinkType='cocktail' />
            <IngredientForm ingredientType='liqueur' drinkType='cocktail' />
            <IngredientForm ingredientType='wine' drinkType='cocktail' />
            <IngredientForm ingredientType='other' drinkType='cocktail' />
          </> }
          { drinkType && 
          <>
            <IngredientForm ingredientType='carbonated' drinkType='cocktail' />
            <IngredientForm ingredientType='juice' drinkType='cocktail' />
            <IngredientForm ingredientType='mixer' drinkType='cocktail' />
          </> }
        </form>
        { drinkType && 
        <Link href='/drinks'>
          <button className={styles.seeDrinksBtn}>
            <span>See Drinks</span>
            <Image alt='See Drinks' src={require('/public/images/ui/cocktail.webp')} width="64" height="64" />
          </button>
        </Link> }
      </section>
    </main>
  )
}

export default HomePage