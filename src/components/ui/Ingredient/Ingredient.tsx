// Component styles
import styles from './Ingredient.module.scss'
// React components
import { useState, useEffect } from 'react'
// Next components
import Image from 'next/image'
// Redux components
import { useSelector, useDispatch } from 'react-redux'
import { useGetAllIngredientsQuery } from '@/store/api/api'
import { toggleIngredientModal, setModalIngredient } from '@/store/slices/ingredientModal.slice'
import { addIngredient, removeIngredient } from '@/store/slices/ingredients.slice'
import { RootState, store } from '@/store/store'
// Local components
import IngredientCheckbox from '@/components/inputs/IngredientCheckbox/IngredientCheckbox'
// Type interfaces
import { Item, DrinkInfo } from '@/types/index'

export default function Ingredient (props: { item: Item, section: Item[]}) {
    // Import props
    const {item, section} = props;
    // React states
    const [hasChildren, setHasChildren] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    // Redux components
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored)
    const dispatch = useDispatch()
    const ingredientImagePath = require(`/public/images/ui/${item['Name'].toLowerCase().split(" ").join("-").replaceAll("/", "-")}.webp`)
    const childrenImagePath = require(`/public/images/ui/more_vert.svg`)
    const allIngredients = (useGetAllIngredientsQuery().data || []);


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
            if (item.AliasId) {
                for (let i = 0; i < allIngredients.length; i++) {
                    if (allIngredients[i].Id === item.AliasId) {
                        dispatch(addIngredient(allIngredients[i]))
                        break;
                    }
                }
            }
        }
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