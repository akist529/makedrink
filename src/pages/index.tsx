// Page styles
import styles from '@/styles/Home.module.scss'
// React components
import { useState, useEffect, useRef } from 'react'
// Next components
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
// Redux components
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { useGetAllDrinkInfoQuery } from '@/store/api/api'
import { clearSelected } from '@/store/slices/ingredients.slice'
// Local components
import RandomDrink from '@/components/ui/RandomDrink/RandomDrink'
import IngredientFilter from '@/components/ui/IngredientFilter/IngredientFilter'
// Type interfaces
import { DrinkInfo, Item } from '@/types/index'

const HomePage: NextPage = () => {
  const [drinkType, setDrinkType] = useState('')
  const [drinkError, setDrinkError] = useState(false)
  const [randomDrink, setRandomDrink] = useState({} as DrinkInfo)
  const possibleDrinks = useSelector((state: RootState) => state.drinks.possible)
  const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
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

  function parentIngredients (type: string) {
    const parentIngredients = [];

    if (storedIngredients.hasOwnProperty(type)) {
      for (const key of Object.keys(storedIngredients[type])) {
        for (const ingredient of storedIngredients[type][key]) {
          if (ingredient.AliasId === 0 && findChildren(ingredient)) {
            parentIngredients.push(ingredient);
          }
        }
      }
    }

    return parentIngredients;
  }

  function childIngredients (item: Item) {
    const childIngredients = [];

    if (storedIngredients.hasOwnProperty(item.Type)) {
      for (const key of Object.keys(storedIngredients[item.Type])) {
        for (const ingredient of storedIngredients[item.Type][key]) {
          if (ingredient.AliasId === item.Id) {
            childIngredients.push(ingredient);
          }
        }
      }
    }

    return childIngredients;
  }

  function findChildren (item: Item) {
    for (const key of Object.keys(storedIngredients[item.Type])) {
      if (storedIngredients[item.Type][key].find((ingredient: Item) => ingredient.AliasId === item.Id)) {
        return true;
      }
    }

    return false;
  }

  function filterIngredients (type: string) {
    const filteredIngredients = [];

    if (storedIngredients.hasOwnProperty(type)) {
        for (const key of Object.keys(storedIngredients[type])) {
            for (const ingredient of storedIngredients[type][key]) {
                filteredIngredients.push(ingredient);
            }
        }
    }

    return filteredIngredients;
  }

  useEffect(() => {
    dispatch(clearSelected());
  }, [drinkType, dispatch])

  return (
    <div className={styles.Home}>
      <header>
        <h1>What Can I Make?</h1>
        <Link href="/ingredients">
          <button className={styles.selectBtn}>
            <span>Select Your Ingredients</span>
            <Image alt="Select Ingredients" src={require('/public/images/ui/select-ingredients.webp')} width="48" height="48" />
          </button>
        </Link>
        <span>Then...</span>
        <button className={styles.randomBtn} onClick={() => getRandomDrink()}>
          <span>Give Me A Drink, Bartender!</span>
          <Image alt="Cocktail" src={require('/public/images/ui/cocktail.webp')} width="48" height="48" />
        </button>
      </header>
      <main>
        <section>
          { (Object.keys(randomDrink).length > 0) && 
            <RandomDrink randomDrink={randomDrink} /> }
          { drinkError &&
            <strong>{ 'You don\'t have enough ingredients to make a drink.' }</strong> }
        </section>
        <h2>Or...</h2>
        <div>
          <button onClick={() => setDrinkType('cocktail')}>
            <span>Cocktail</span>
            <Image alt="Cocktail" src={require('/public/images/ui/local_bar.svg')} width="16" height="16" />
          </button>
          <button onClick={() => setDrinkType('mocktail')}>
            <span>Mocktail</span>
            <Image alt="Mocktail" src={require('/public/images/ui/no_drinks.svg')} width="16" height="16" />
          </button>
        </div>
        <form>
          { (drinkType === 'cocktail') && 
          <>
            <fieldset>
              <legend>Liquor</legend>
              { parentIngredients('liquor').map((ingredient: Item, index: number) => {
                return (
                  <fieldset key={index}>
                    <legend>{ingredient.Name}</legend>
                    { childIngredients(ingredient).map((ingredient: Item, index: number) => {
                      return <IngredientFilter key={index} ingredient={ingredient} drinkType={drinkType} />
                    }) }
                  </fieldset>
                );
              }) }
            </fieldset>
            <fieldset>
              <legend>Liqueur</legend>
              { filterIngredients('liqueur').map((ingredient: Item, index: number) => {
                return <IngredientFilter key={index} ingredient={ingredient} drinkType={drinkType} />
              }) }
            </fieldset>
            <fieldset>
              <legend>Other Alcohol</legend>
              { filterIngredients('other').map((ingredient: Item, index: number) => {
                return <IngredientFilter key={index} ingredient={ingredient} drinkType={drinkType} />
              }) }
              { filterIngredients('wine').map((ingredient: Item, index: number) => {
                return <IngredientFilter key={index} ingredient={ingredient} drinkType={drinkType} />
              }) }
            </fieldset>
          </> }
          { drinkType && 
          <>
            <fieldset>
              <legend>Carbonated</legend>
              { filterIngredients('carbonated').map((ingredient: Item, index: number) => {
                return <IngredientFilter key={index} ingredient={ingredient} drinkType={drinkType} />
              }) }
            </fieldset>
            <fieldset>
              <legend>Juice</legend>
              { filterIngredients('juice').map((ingredient: Item, index: number) => {
                return <IngredientFilter key={index} ingredient={ingredient} drinkType={drinkType} />
              }) }
            </fieldset>
            <fieldset>
              <legend>Other Mixers</legend>
              { filterIngredients('mixer').map((ingredient: Item, index: number) => {
                return <IngredientFilter key={index} ingredient={ingredient} drinkType={drinkType} />
              }) }
            </fieldset>
          </> }
        </form>
        { drinkType && <Link href='/drinks'>
          <button>
            See Drinks
          </button>
        </Link> }
      </main>
    </div>
  )
}

export default HomePage