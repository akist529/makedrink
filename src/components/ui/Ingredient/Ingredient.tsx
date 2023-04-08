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
import { RootState } from '@/store/store'
import { useGetAllIngredientsQuery } from '@/store/api/api'
// Local components
import IngredientCheckbox from '@/components/inputs/IngredientCheckbox/IngredientCheckbox'
// Type interfaces
import { Item } from '@/types/index'

export default function Ingredient (props: { item: Item, section: Item[] }) {
    // Import props
    const {item, section} = props
    // React states
    const [hasChildren, setHasChildren] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    // Redux components
    const storedIngredients: Item[] = useSelector((state: RootState) => state.ingredients.stored)
    const { data, isLoading, error } = useGetAllIngredientsQuery()

    const dispatch = useDispatch()
    const ingredientImagePath = require(`/public/images/ui/${item['Name'].toLowerCase().split(" ").join("-").replaceAll("/", "-")}.webp`)
    const childrenImagePath = require(`/public/images/ui/more_vert.svg`)

    // See if ingredient has child ingredients
    useEffect(() => {
        (data as Item[]).forEach(ingredient => {
            if (ingredient['AliasId'] === item['Id']) {
                setHasChildren(true)
            }
        })
    }, [data])

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
        if (hasChildren) {
            dispatch(setModalIngredient(item))
            dispatch(toggleIngredientModal())
        } else {
            if (JSON.stringify(storedIngredients).includes(JSON.stringify(item))) {
                dispatch(removeIngredient(item))
            } else {
                dispatch(addIngredient(item))
            }
        }
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