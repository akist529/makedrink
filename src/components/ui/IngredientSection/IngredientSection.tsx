import styles from './IngredientSection.module.scss'
import Image from 'next/image'
import { useEffect } from 'react'

export default function IngredientSection (props: any) {
    const {section} = props

    function changeLocalStorage(item: string) {
        const prevValue = JSON.parse(localStorage.getItem(item) || 'false')
        
        if (prevValue) {
            (document.getElementById(`${item}`) as HTMLDivElement).classList.add(`${styles.unchecked}`);
            (document.getElementById(`${item}`) as HTMLDivElement).classList.remove(`${styles.checked}`);
            localStorage.removeItem(item)
        } else {
            (document.getElementById(`${item}`) as HTMLDivElement).classList.add(`${styles.checked}`);
            (document.getElementById(`${item}`) as HTMLDivElement).classList.remove(`${styles.unchecked}`);
            localStorage.setItem(item, 'true')
        }
    }

    useEffect(() => {
        const items = document.querySelectorAll('.checkbox')

        items.forEach(item => {
            const state = JSON.parse(localStorage.getItem(item.id) || 'false')

            if (state) {
                (document.getElementById(`${item.id}`) as HTMLDivElement).classList.remove('unchecked');
                (document.getElementById(`${item.id}`) as HTMLDivElement).classList.add('checked');
            }
        })
    }, [])

    return (
        <ul className={styles.IngredientSection}>
            {section.map((item: any) => {
                return (
                    <li key={item.name} className={styles.Ingredient}>
                        <div>
                            <span>{item.name}</span>
                            <Image alt={item.name} src={require(`/public/images/ui/${item.name.toLowerCase().split(" ").join("-")}.webp`)} />
                        </div>
                        <div id={item.name} className={['checkbox', styles.checkbox, styles.unchecked].join(' ')} onClick={() => changeLocalStorage(item.name)} />
                    </li>
                )
            })}
        </ul>
    )
}