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
import { addPossibleDrink } from '@/store/slices/drinks.slice'
import { RootState } from '@/store/store'
import { useGetAllIngredientsQuery, useGetAllDrinkInfoQuery } from '@/store/api/api'
// Local components
import IngredientCheckbox from '@/components/inputs/IngredientCheckbox/IngredientCheckbox'
// Type interfaces
import { Item, DrinkInfo } from '@/types/index'
import { cp } from 'fs/promises'

export default function Ingredient (props: { item: Item, section: Item[] }) {
    // Import props
    const {item, section} = props
    // React states
    const [hasChildren, setHasChildren] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    // Redux components
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored)
    const possibleDrinks = useSelector((state: RootState) => state.drinks.possible)
    const allIngredients = useGetAllIngredientsQuery()
    const allDrinkInfo = useGetAllDrinkInfoQuery()

    const dispatch = useDispatch()
    const ingredientImagePath = require(`/public/images/ui/${item['Name'].toLowerCase().split(" ").join("-").replaceAll("/", "-")}.webp`)
    const childrenImagePath = require(`/public/images/ui/more_vert.svg`)

    // See if ingredient has child ingredients
    useEffect(() => {
        const filteredData = (allIngredients.data as Item[]).filter(ingredient => {
            return ingredient.Type === item.Type;
        })

        for (const ingredient of filteredData) {
            if (ingredient.AliasId === item.Id) {
                setHasChildren(true);
                break;
            }
        }
    }, [allIngredients.data])

    // If parent ingredient, see if child ingredient in store
    useEffect(() => {
        if (hasChildren && !isChecked && storedIngredients.hasOwnProperty(item.Type)) {
            for (const key of Object.keys(storedIngredients[item.Type])) {
                for (const ingredient of storedIngredients[item.Type][`${key}`]) {
                    if (ingredient.AliasId === item.Id) {
                        setIsChecked(true);
                        break;
                    }
                }

                if (isChecked) {
                    break;
                }
            }
        }
    }, [hasChildren])

    useEffect(() => {
        const letter = item.Name.charAt(0);

        if (storedIngredients.hasOwnProperty(item.Type) && storedIngredients[`${item.Type}`].hasOwnProperty(letter)) {
            if (storedIngredients[`${item.Type}`][`${letter}`].find((ingredient: Item) => ingredient.Name === item.Name) || includesAlias()) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        } else {
            setIsChecked(false);
        }
    }, [storedIngredients])

    function updateIngredients () {
        if (hasChildren) { // Open modal if parent ingredient
            dispatch(setModalIngredient(item))
            dispatch(toggleIngredientModal())
        } else { // Update store if child ingredient
            // Remove ingredient from store if there
            const letter = item.Name.charAt(0);

            const ingredientInStore = (() => {
                if (storedIngredients.hasOwnProperty(item.Type)) {
                    if (storedIngredients[item.Type].hasOwnProperty(letter)) {
                        if (storedIngredients[item.Type][`${letter}`].find((ingredient: Item) => ingredient.Name === item.Name)) {
                            return true;
                        }
                    }
                }

                return false;
            })()

            if (ingredientInStore) {
                dispatch(removeIngredient(item))

                // Remove parent ingredient from store if no child ingredients are left
                if (item.AliasId) {
                    let otherAliasExists = false;

                    for (const key of Object.keys(storedIngredients[item.Type])) {
                        for (const ingredient of storedIngredients[item.Type][`${key}`]) {
                            if (ingredient.AliasId === item.AliasId) {
                                otherAliasExists = true;
                                break;
                            }
                        }

                        if (otherAliasExists) {
                            break;
                        }
                    }

                    if (!otherAliasExists) {
                        let aliasRemoved = false;

                        for (const key of Object.keys(storedIngredients[item.Type])) {
                            for (const ingredient of storedIngredients[item.Type][`${key}`]) {
                                if (ingredient.Id === item.AliasId) {
                                    dispatch(removeIngredient(ingredient));
                                    aliasRemoved = true;
                                    break;
                                }
                            }

                            if (aliasRemoved) {
                                break;
                            }
                        }
                    }
                }
            } else { // Add ingredient to store if not there
                dispatch(addIngredient(item))

                // Add parent ingredient to store if applicable
                const filteredData = (allIngredients.data || []).filter((ingredient: Item) => {
                    return ingredient.Type === item.Type
                })

                for (const ingredient of filteredData) {
                    if (ingredient.Id === item.AliasId) {
                        dispatch(addIngredient(ingredient))
                        break;
                    }
                }
            }

            updatePossibleDrinks()
        }
    }

    function updatePossibleDrinks () {
        // Find possible drink recipes based on new ingredient
        const onlyNewDrinks: DrinkInfo[] = (allDrinkInfo.data || []).filter(drink => {
            for (const possibleDrink of possibleDrinks) {
                if (possibleDrink.Name === drink.Name) {
                    return true;
                }
            }
            
            return false;
        })

        const drinksToAdd: DrinkInfo[] = []
        
        onlyNewDrinks.forEach(drink => {
            const haveIngredients = drink.Recipe.every(ingredient => {
                for (const type of Object.keys(storedIngredients)) {
                    for (const key of Object.keys(storedIngredients[`${type}`])) {
                        for (const item of storedIngredients[`${type}`][`${key}`]) {
                            if ((item.Name === ingredient.Name) || (item.Name === ingredient.Alias)) {
                                return true
                            }
                        }
                    }
                }

                return false
            })

            if (haveIngredients) {
                drinksToAdd.push(drink)
            }
        })
        
        drinksToAdd.forEach(drink => {
            dispatch(addPossibleDrink(drink))
        })
    }

    function includesAlias () {
        for (const key of Object.keys(storedIngredients[`${item.Type}`])) {
            for (const ingredient of storedIngredients[`${item.Type}`][`${key}`]) {
                if (ingredient.AliasId === item.Id) {
                    return true
                }
            }
        }
    }

    return (
        <li className={styles.Ingredient}>
            <button className={styles.info} onClick={() => updateIngredients()}>
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