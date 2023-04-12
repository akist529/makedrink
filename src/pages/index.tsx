// Page styles
import styles from '@/styles/Home.module.scss'
// React components
import { useState, useEffect, useRef } from 'react'
// Next components
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
// Redux components
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useGetAllDrinkInfoQuery } from '@/store/api/api'
// Local components
import IngredientFilter from '@/components/ui/IngredientFilter/IngredientFilter'
// Type interfaces
import { DrinkInfo } from '@/types/index'

const HomePage: NextPage = () => {
  const [drinkType, setDrinkType] = useState('')
  const [drinkError, setDrinkError] = useState(false)
  const [randomDrink, setRandomDrink] = useState({} as DrinkInfo)
  const allDrinkInfo = useGetAllDrinkInfoQuery()
  const storedIngredients = useSelector((state: RootState) => state.ingredients.stored)
  const possibleDrinks: DrinkInfo[] = []

  useEffect(() => {
    for (const drink of (allDrinkInfo.data || [])) {
      if (possibleDrinks.includes(drink)) {
        continue
      } else {
        const hasIngredients: boolean[] = []

        for (const recipeItem of drink['Recipe']) {
          let hasIngredient = false
  
          for (const ingredient of storedIngredients) {
            if (recipeItem['Name'] === ingredient['Name']) {
              hasIngredient = true
            }
          }

          if (hasIngredient) {
            hasIngredients.push(true)
          }
        }

        if (hasIngredients.length === drink['Recipe'].length) {
          possibleDrinks.push(drink)
        }
      }
    }
  }, [storedIngredients])

  function getRandomDrink () {
    if (!possibleDrinks.length) {
      setDrinkError(true)
    } else {
      const randomIndex = Math.floor(Math.random() * possibleDrinks.length)
      const randomDrink = possibleDrinks[randomIndex] || {}
      setRandomDrink(randomDrink)
      setDrinkError(false)
    }
  }

  return (
    <div className={styles.HomePage}>
      <div className={styles.Home}>
        <h1>What Can I Make?</h1>
        <Link href="/ingredients">
          <button className={styles.selectBtn}>
            <span>Select Your Ingredients</span>
            <Image alt="Select Ingredients" src={require('/public/images/ui/select-ingredients.webp')} width="48" height="48" />
          </button>
        </Link>
        <span>Then</span>
        <button className={styles.randomBtn} onClick={() => getRandomDrink()}>
          <span>Give Me A Drink, Bartender!</span>
          <Image alt="Cocktail" src={require('/public/images/ui/cocktail.webp')} width="48" height="48" />
        </button>
        { (Object.keys(randomDrink).length > 0) && <div className={styles.randomDrink}>
          <span>{randomDrink['Name']}</span>
          <span>DRINK IMAGE</span>
          { randomDrink['Recipe'].map((ingredient, index) => {
            return <span key={index}>{ingredient['Name']}</span>
          }) }
          <button>
            <span>GO TO DRINK</span>
            <Image alt="Go to Drink" src={require('/public/images/ui/local_bar.svg')} width="16" height="16" />
          </button>
        </div> }
        { drinkError &&
          <div>
            <span>{ 'You don\'t have enough ingredients to make a drink.' }</span>
          </div> }
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
        { (drinkType === 'cocktail') &&
          <h2>Alcohol</h2> }
        { (drinkType === 'cocktail') && <div>
          <h3>Spirits</h3>
          <IngredientFilter type='liquor' />
        </div> }
        { (drinkType === 'cocktail') && <div>
          <h3>Liqueurs</h3>
          <IngredientFilter type='liqueur' />
        </div> }
        { (drinkType === 'cocktail') && <div>
          <h3>Other</h3>
          <IngredientFilter type='other' />
          <IngredientFilter type='wine' />
        </div> }
        { drinkType &&
          <h2>Mixers</h2> }
        { drinkType && <div>
          <h3>Carbonated</h3>
          <IngredientFilter type='carbonated' />
        </div> }
        { drinkType && <div>
          <h3>Juices</h3>
          <IngredientFilter type='juice' />
        </div> }
        { drinkType && <div>
          <h3>Other</h3>
          <IngredientFilter type='mixer' />
        </div> }
      </div>
      <footer>
        <a>Bartender icon created by Iconduck</a>
        <a href="https://www.flaticon.com/free-icons" title="spirit icons">Spirit icons created by Freepik - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/beer-can" title="beer can icons">Beer can icons created by Flat Icons - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/soda" title="soda icons">Soda icons created by AmethystDesign - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/liqueur" title="liqueur icons">Liqueur icons created by surang - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/liquor" title="liquor icons">Liquor icons created by BZZRINCANTATION - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/liquor" title="liquor icons">Liquor icons created by Triangle Squad - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/liquor" title="liquor icons">Liquor icons created by Pause08 - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/rice-wine" title="rice wine icons">Rice wine icons created by imaginationlol - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/cranberry" title="cranberry icons">Cranberry icons created by shmai - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/grapefruit" title="grapefruit icons">Grapefruit icons created by amonrat rungreangfangsai - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/jug" title="jug icons">Jug icons created by DinosoftLabs - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/food-and-restaurant" title="food and restaurant icons">Food and restaurant icons created by rizky maulidhani - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/sauce" title="sauce icons">Sauce icons created by Talha Dogar - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/almond" title="almond icons">Almond icons created by shmai - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/whiskey" title="whiskey icons">Whiskey icons created by Smashicons - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/alcohol" title="alcohol icons">Alcohol icons created by Flat Icons Design - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/alcohol" title="alcohol icons">Alcohol icons created by photo3idea_studio - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/drink" title="drink icons">Drink icons created by monkik - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/bottle" title="bottle icons">Bottle icons created by Ina Mella - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/white-wine" title="white wine icons">White wine icons created by Kanyanee Watanajitkasem - Flaticon</a>
        <a href="http://freefrontend.com/css-liquid-effects">CSS liquid effect by Dave Quah</a>
        <a href="https://www.flaticon.com/free-icons/drunk" title="drunk icons">Drunk icons created by Prosymbols Premium - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/bartender" title="bartender icons">Bartender icons created by photo3idea_studio - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/bottle" title="bottle icons">Bottle icons created by Aranagraphics - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/rum" title="rum icons">Rum icons created by small.smiles - Flaticon</a>
      </footer>
    </div>
  )
}

export default HomePage