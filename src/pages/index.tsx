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
import RandomDrink from '@/components/ui/RandomDrink/RandomDrink'
import IngredientFilter from '@/components/ui/IngredientFilter/IngredientFilter'
// Type interfaces
import { DrinkInfo } from '@/types/index'

const HomePage: NextPage = () => {
  const [drinkType, setDrinkType] = useState('')
  const [drinkError, setDrinkError] = useState(false)
  const [randomDrink, setRandomDrink] = useState({} as DrinkInfo)
  const possibleDrinks = useSelector((state: RootState) => state.drinks.possible)

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
    <div className={styles.Home}>
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
      { (Object.keys(randomDrink).length > 0) && <RandomDrink randomDrink={randomDrink} /> }
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
      { drinkType && <Link href='/drinks'>
        <button>
          See Drinks
        </button>
      </Link> }
    </div>
  )
}

export default HomePage