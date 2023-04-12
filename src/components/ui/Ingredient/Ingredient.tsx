// Component styles
import styles from './Ingredient.module.scss'
// React components
import { useState, useEffect } from 'react'
// Next components
import Image from 'next/image'
// Redux components
import { useSelector, useDispatch } from 'react-redux'
import { toggleIngredientModal, setModalIngredient } from '@/store/slices/ingredientModal.slice'
import { addIngredient, removeIngredient } from '@/store/slices/ingredients.slice'
import { addPossibleDrink, removePossibleDrink } from '@/store/slices/drinks.slice'
import { RootState } from '@/store/store'
import { useGetAllIngredientsQuery, useGetAllDrinksQuery, useGetAllDrinkInfoQuery } from '@/store/api/api'
// Local components
import IngredientCheckbox from '@/components/inputs/IngredientCheckbox/IngredientCheckbox'
// Type interfaces
import { Item, DrinkInfo } from '@/types/index'

export default function Ingredient (props: { item: Item, section: Item[] }) {
    // Import props
    const {item, section} = props
    // React states
    const [hasChildren, setHasChildren] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    // Redux components
    const storedIngredients: Item[] = useSelector((state: RootState) => state.ingredients.stored)
    const possibleDrinks: DrinkInfo[] = useSelector((state: RootState) => state.drinks.possible)
    const allIngredients = useGetAllIngredientsQuery()
    const allDrinks = useGetAllDrinksQuery()
    const allDrinkInfo = useGetAllDrinkInfoQuery()

    const dispatch = useDispatch()
    const ingredientImagePath = require(`/public/images/ui/${item['Name'].toLowerCase().split(" ").join("-").replaceAll("/", "-")}.webp`)
    const childrenImagePath = require(`/public/images/ui/more_vert.svg`)

    // See if ingredient has child ingredients
    useEffect(() => {
        (allIngredients.data as Item[]).forEach(ingredient => {
            if (ingredient['AliasId'] === item['Id']) {
                setHasChildren(true)
            }
        })
    }, [allIngredients.data])

    // If parent ingredient, see if child ingredient in store
    useEffect(() => {
        if (hasChildren) {
            storedIngredients.forEach(ingredient => {
                if (ingredient['AliasId'] === item['Id']) {
                    setIsChecked(true)
                }
            })
        }
    }, [hasChildren])

    useEffect(() => {
        if (JSON.stringify(storedIngredients).includes(JSON.stringify(item))) {
            setIsChecked(true)
        } else if (includesAlias()) {
            setIsChecked(true)
        } else {
            setIsChecked(false)
        }
    }, [storedIngredients])

    function handleClick () {
        if (hasChildren) { // Open modal if parent ingredient
            dispatch(setModalIngredient(item))
            dispatch(toggleIngredientModal())
        } else { // Update store if child ingredient
            if (JSON.stringify(storedIngredients).includes(JSON.stringify(item))) {
                dispatch(removeIngredient(item))

                if (item['AliasId']) {
                    let otherAliasExists = false

                    for (const ingredient of storedIngredients) {
                        if (ingredient['AliasId'] === item['AliasId']) {
                            otherAliasExists = true
                        }
                    }

                    if (!otherAliasExists) {
                        for (const ingredient of storedIngredients) {
                            if (ingredient['Id'] === item['AliasId']) {
                                dispatch(removeIngredient(ingredient))
                            }
                        }
                    }
                }
            } else {
                dispatch(addIngredient(item))

                for (const ingredient of (allIngredients.data || [])) {
                    if (ingredient['Id'] === item['AliasId']) {
                        dispatch(addIngredient(ingredient))
                    }
                }
            }

            for (const drinkInfo of (allDrinkInfo.data || [])) {
                let hasIngredients: boolean[] = []

                for (const recipeItem of drinkInfo['Recipe']) {
                    for (const ingredient of storedIngredients) {
                        if (ingredient['Name'] === recipeItem['Name']) {
                            hasIngredients.push(true)
                        } else if (ingredient['Name'] === recipeItem['Alias']) {
                            hasIngredients.push(true)
                        }
                    }
                }

                if (hasIngredients.length === drinkInfo['Recipe'].length) {
                    dispatch(addPossibleDrink(drinkInfo))
                } else {
                    dispatch(removePossibleDrink(drinkInfo))
                }
            }
        }

        console.log(possibleDrinks)
    }

    function includesAlias () {
        for (const ingredient of storedIngredients) {
            if (ingredient['AliasId'] === item['Id']) {
                return true
            }
        }
    }

    return (
        <li className={styles.Ingredient}>
            <button className={styles.info} onClick={() => handleClick()}>
                { hasChildren &&
                    <Image className={styles.children} alt="Show Varieties" src={childrenImagePath} width="8" height="64" /> }
                <div className={styles.icon}>
                    <Image alt={item['Name']} src={ingredientImagePath} />
                </div>
                <IngredientCheckbox item={item} isChecked={isChecked} />
            </button>
            <span>{item['Name']}</span>
        </li>
    )
}