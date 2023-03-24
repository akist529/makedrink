import styles from './IngredientSection.module.scss'
import Image from 'next/image'
import { useEffect } from 'react'

export default function IngredientSection (props: any) {
    const {section} = props

    function changeLocalStorage(item: string) {
        const prevValue = JSON.parse(localStorage.getItem(item) || 'false')

        if (prevValue) {
            localStorage.setItem(item, 'false')
        } else {
            localStorage.setItem(item, 'true')
        }
    }

    useEffect(() => {
        const items = document.querySelectorAll('input')

        items.forEach(item => {
            const state = JSON.parse(localStorage.getItem(item.id) || 'false')

            if (state) {
                (document.getElementById(`${item.id}`) as HTMLInputElement).checked = true
            }
        })
    }, [])

    return (
        <ul className={styles.IngredientSection}>
            {section.map((item: string) => {
                return (
                    <li key={item} className={styles.Ingredient}>
                        <div>
                            <span>{item}</span>
                            <Image alt={item} src={require(`/public/images/ui/${item.toLowerCase().split(" ").join("-")}.webp`)} />
                        </div>
                        <input id={item} type="checkbox" onChange={() => changeLocalStorage(item)} />
                    </li>
                )
            })}
        </ul>
    )
}