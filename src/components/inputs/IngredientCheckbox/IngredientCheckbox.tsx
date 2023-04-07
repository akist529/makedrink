import styles from './IngredientCheckbox.module.scss'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Item, StoredIngredient } from '@/types/index'
import { useGetAllIngredientsQuery } from '@/store/api/api'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'

export default function IngredientCheckbox(props: { item: Item }) {
    const {item} = props
    const [colorIsLight, setColorIsLight] = useState(false)
    const { availableIngredients } = useSelector((state: RootState) => state.ingredients)
    const { data, isLoading, error } = useGetAllIngredientsQuery()
    const [isChecked, setIsChecked] = useState(() => {
        return JSON.parse(localStorage.getItem('ingredients') || '[]')
            .filter((ingredient: StoredIngredient) => ingredient['Name'] === item['Name'])
            ['Value']
    })

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

    return (
        <div
            id={item['Name']}
            className={[styles.checkbox, (isChecked && styles.checked), (colorIsLight && styles.lightColor)].join(' ')}
            {...(isChecked && {style: { background: `var(--whiskey)` }})}
        >
            { !isChecked && <Image className={styles.notSelected} alt="Ingredient Not Selected" src={require('/public/images/ui/close.svg')} width="48" height="48" /> }
        </div>
    )
}