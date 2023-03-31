import styles from './IngredientCheckbox.module.scss'
import { useState, useEffect } from 'react'

export default function IngredientCheckbox(props: any) {
    const {item} = props
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const state = localStorage.getItem(`${item.name}`)

            if (state) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        }
    }, [])

    const colorIsLight = (function colorIsLight() {
        const hex = item.color.replace('#', '')
        const c_r = parseInt(hex.substring(0, 0 + 2), 16)
        const c_g = parseInt(hex.substring(2, 2 + 2), 16)
        const c_b = parseInt(hex.substring(4, 4 + 2), 16)
        const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000
        return brightness > 155
    })()

    function changeLocalStorage(item: string) {
        const prevValue = JSON.parse(localStorage.getItem(item) || 'false')
        
        if (prevValue) {
            setIsChecked(false)
            localStorage.removeItem(item)
        } else {
            setIsChecked(true)
            localStorage.setItem(item, 'true')
        }
    }

    return (
        <div
            id={item.name}
            className={[styles.checkbox, (isChecked && styles.checked), (colorIsLight && styles.lightColor)].join(' ')}
            {...(isChecked && {style: { background: `${item.color}` }})}
            onClick={ () => changeLocalStorage(item.name) }
        />
    )
}