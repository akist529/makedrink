import styles from './IngredientSection.module.scss'
import Image from 'next/image'
import IngredientCheckbox from '../../../components/inputs/IngredientCheckbox/IngredientCheckbox'

export default function IngredientSection (props: any) {
    const {section} = props

    return (
        <ul className={styles.IngredientSection}>
            {section.map((item: any) => {
                return (
                    <li key={item.name} className={styles.Ingredient}>
                        <div className={styles.name}>
                            <span>{item.name}</span>
                            <Image alt={item.name} src={require(`/public/images/ui/${item.name.toLowerCase().split(" ").join("-")}.webp`)} />
                        </div>
                        <IngredientCheckbox item={item} />
                    </li>
                )
            })}
        </ul>
    )
}