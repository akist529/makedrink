// Component styles
import styles from './Ingredient.module.scss'
// React components
import { useState, useEffect } from 'react'
// Next components
import Image from 'next/image'
// Redux components
import { useSelector, useDispatch } from 'react-redux'
import { toggleIngredientModal, setModalIngredient } from '@/store/slices/ingredientModal.slice'
import { addIngredient } from '@/store/slices/ingredients.slice'
import { RootState } from '@/store/store'
// Local components
import IngredientCheckbox from '@/components/inputs/IngredientCheckbox/IngredientCheckbox'
// Type interfaces
import { Item, StoredIngredient } from '@/types/index'

export default function Ingredient (props: { item: Item, section: Item[] }) {
    // Import props
    const { item, section } = props
    // React states
    const [hasChildren, setHasChildren] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    
    const dispatch = useDispatch()
    const ingredientImagePath = require(`/public/images/ui/${item['Name'].toLowerCase().split(" ").join("-").replaceAll("/", "-")}.webp`)
    const childrenImagePath = require(`/public/images/ui/more_vert.svg`)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const state = localStorage.getItem(`${item['Name']}`)

            if (state) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        }

        section.forEach(ingredient => {
            if (ingredient['AliasId'] === item['Id']) {
                setHasChildren(true)

                if (localStorage.getItem(`${ingredient['Name']}`)) {
                    setIsChecked(true);
                }
            }
        })
    }, [])

    function ChangeLocalStorage() {
        const ingredients = useSelector((state: RootState) => state.ingredients)
        
        console.log(ingredients)
        const prevValue = 0
        
        if (prevValue) {
            setIsChecked(false)
            localStorage.removeItem(item['Name'])
        } else {
            setIsChecked(true)
            localStorage.setItem(item['Name'], 'true')
        }
    }

    function handleClick () {
        if (hasChildren) {
            dispatch(setModalIngredient(item))
            dispatch(toggleIngredientModal())
        } else {
            ChangeLocalStorage()
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