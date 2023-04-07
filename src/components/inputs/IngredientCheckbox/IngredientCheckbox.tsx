// Component styles
import styles from './IngredientCheckbox.module.scss'
// React components
import { useState, useEffect } from 'react'
// Next components
import Image from 'next/image'
// Redux components
import { useSelector, useDispatch } from 'react-redux'
import { useGetAllIngredientsQuery } from '@/store/api/api'
import { RootState } from '@/store/store'
// Type interfaces
import { Item, StoredIngredient } from '@/types/index'

export default function IngredientCheckbox(props: { item: Item }) {
    // Import props
    const {item} = props
    // React states
    const [colorIsLight, setColorIsLight] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    // Redux selectors
    const { storedIngredients } = useSelector((state: RootState) => state.ingredients)

    // See if ingredient is already in store
    useEffect(() => {
        const storage = storedIngredients.filter(ingredient => ingredient['Name'] === item['Name'])

        if (storage) {
            setIsChecked(true)
        }
    }, [])

    // Decide color of checkmark based on ingredient color
    useEffect(() => {
        setColorIsLight(() => {
            const style = getComputedStyle(document.body)
            const hex = style.getPropertyValue(`--whiskey`).replace('#', '')
            const c_r = parseInt(hex.substring(0, 0 + 2), 16)
            const c_g = parseInt(hex.substring(2, 2 + 2), 16)
            const c_b = parseInt(hex.substring(4, 4 + 2), 16)
            const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000
            return brightness > 155
        })
    }, [])

    const boxStyles = [styles.checkbox, (isChecked && styles.checked), (colorIsLight && styles.lightColor)].join(' ')
    const imagePath = require('/public/images/ui/close.svg')

    return (
        <div id={item['Name']} className={boxStyles} {...isChecked && {style: {background: `var(--whiskey)`}}}>
            { !isChecked && 
                <Image className={styles.notSelected} alt="Ingredient Not Selected" src={imagePath} width="48" height="48" /> }
        </div>
    )
}