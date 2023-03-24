import styles from './IngredientSection.module.scss'
import Image from 'next/image'

export default function IngredientSection (props: any) {
    const {section} = props

    return (
        <ul className={styles.IngredientSection}>
            {section.map((item: string) => {
                return (
                    <li key={item}>
                        <div>
                            <span>{item}</span>
                            <Image alt={item} src={require(`/public/images/ui/${item.toLowerCase().split(" ").join("-")}.webp`)} />
                        </div>
                        <input type="checkbox" />
                    </li>
                )
            })}
        </ul>
    )
}