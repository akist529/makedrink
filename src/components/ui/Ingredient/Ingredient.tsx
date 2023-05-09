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
    const allDrinkInfo = useGetAllDrinkInfoQuery()

    const dispatch = useDispatch()
    const ingredientImagePath = require(`/public/images/ui/${item['Name'].toLowerCase().split(" ").join("-").replaceAll("/", "-")}.webp`)
    const childrenImagePath = require(`/public/images/ui/more_vert.svg`)

    // See if ingredient has child ingredients
    useEffect(() => {
        if (!item.AliasId) {
            for (const ingredient of section) {
                if (ingredient.AliasId === item.Id) {
                    setHasChildren(true);
                    break;
                }
            }
        }
    }, [])


    // If parent ingredient, see if child ingredient is in store
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
    }, [hasChildren]) // Execute if ingredient is denoted as having children


    // Fill checkbox if ingredient is in store
    useEffect(() => {
        // See if child ingredient is in store
        function includesAlias () {
            for (const key of Object.keys(storedIngredients[`${item.Type}`])) {
                for (const ingredient of storedIngredients[`${item.Type}`][`${key}`]) {
                    if (ingredient.AliasId === item.Id) {
                        return true;
                    }
                }
            }

            return false;
        }

        const letter = item.Name.charAt(0);

        if (hasChildren && storedIngredients.hasOwnProperty(item.Type) && includesAlias()) {
            setIsChecked(true);
        } else if (storedIngredients.hasOwnProperty(item.Type) 
            && storedIngredients[`${item.Type}`].hasOwnProperty(letter)) {
            if (storedIngredients[`${item.Type}`][`${letter}`].find((ingredient: Item) => ingredient.Name === item.Name)) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        } else {
            setIsChecked(false);
        }
    }, [storedIngredients]) // Execute if stored ingredients updates


    // Open modal if parent ingredient
    function openModal () {
        dispatch(setModalIngredient(item));
        dispatch(toggleIngredientModal());
    }


    // Update store based on state of ingredient checkbox (add or remove)
    function updateIngredients () {
        const letter = item.Name.charAt(0);

        const ingredientInStore = (() => {
            if (storedIngredients.hasOwnProperty(item.Type)
                && storedIngredients[item.Type].hasOwnProperty(letter)
                && storedIngredients[item.Type][`${letter}`].find((ingredient: Item) => ingredient.Name === item.Name)) {
                    return true;
                }

            return false;
        })()

        if (ingredientInStore) {
            dispatch(removeIngredient(item))
        } else { // Add ingredient to store if not there
            dispatch(addIngredient(item))

            // Add parent ingredient to store if applicable
            for (const ingredient of section) {
                if (ingredient.Id === item.AliasId) {
                    dispatch(addIngredient(ingredient))
                    break;
                }
            }
        }

        updatePossibleDrinks()
    }


    // See if new drinks can be made based on currently stored ingredients
    function updatePossibleDrinks () {
        // Find possible drink recipes based on new ingredient
        const onlyNewDrinks: DrinkInfo[] = (allDrinkInfo.data || []).filter(drink => {
            for (const possibleDrink of possibleDrinks) {
                if (possibleDrink.Name === drink.Name) {
                    return false;
                }
            }
            
            return true;
        })

        const drinksToAdd: DrinkInfo[] = []

        for (let i = 0; i < onlyNewDrinks.length; i++) {
            const haveIngredients = onlyNewDrinks[i].Recipe.every(ingredient => {
                const letter = ingredient.Name.charAt(0);

                for (const type of Object.keys(storedIngredients)) {
                    if (storedIngredients[`${type}`].hasOwnProperty(letter)) {
                        for (const item of storedIngredients[`${type}`][`${letter}`]) {
                            if ((item.Name === ingredient.Name) || (item.Name === ingredient.Alias)) {
                                return true
                            }
                        }
                    }
                }

                return false
            })

            if (haveIngredients) {
                drinksToAdd.push(onlyNewDrinks[i])
            }
        }
        
        drinksToAdd.forEach(drink => {
            dispatch(addPossibleDrink(drink))
        })
    }


    return (
        <li className={styles.Ingredient}>
            <button className={styles.info} onClick={() => hasChildren ? openModal() : updateIngredients()}>
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