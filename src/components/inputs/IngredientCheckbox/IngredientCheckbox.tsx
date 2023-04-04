import styles from './IngredientCheckbox.module.scss'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function IngredientCheckbox(props: any) {
    const {item} = props
    const [isChecked, setIsChecked] = useState(false)
    const [colorIsLight, setColorIsLight] = useState(false)

    useEffect(() => {
        setColorIsLight(() => {
            const style = getComputedStyle(document.body)
            const hex = style.getPropertyValue(`--${item['Color']}`).replace('#', '')
            const c_r = parseInt(hex.substring(0, 0 + 2), 16)
            const c_g = parseInt(hex.substring(2, 2 + 2), 16)
            const c_b = parseInt(hex.substring(4, 4 + 2), 16)
            const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000
            return brightness > 155
        })

        if (typeof window !== 'undefined') {
            const state = localStorage.getItem(`${item['Name']}`)

            if (state) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        }
    }, [])

    function changeLocalStorage() {
        const prevValue = JSON.parse(localStorage.getItem(item['Name']) || 'false')
        
        if (prevValue) {
            setIsChecked(false)
            localStorage.removeItem(item['Name'])
        } else {
            setIsChecked(true)
            localStorage.setItem(item['Name'], 'true')
        }
    }

    return (
        <div
            id={item['Name']}
            className={[styles.checkbox, (isChecked && styles.checked), (colorIsLight && styles.lightColor)].join(' ')}
            {...(isChecked && {style: { background: `var(--${item['Color']})` }})}
            onClick={ () => changeLocalStorage() }
        >
            { !isChecked && <Image className={styles.notSelected} alt="Ingredient Not Selected" src={require('/public/images/ui/close.svg')} width="48" height="48" /> }
        </div>
    )
}