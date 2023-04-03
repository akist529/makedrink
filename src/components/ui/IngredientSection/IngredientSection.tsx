import styles from './IngredientSection.module.scss'
import Image from 'next/image'
import IngredientCheckbox from '../../../components/inputs/IngredientCheckbox/IngredientCheckbox'

export default function IngredientSection (props: any) {
    const {section} = props

    const sortedSection = (function sortNames () {
        const sorted = section.sort(function (a: any, b: any) {
            if (a['Name'] < b['Name']) {
                return -1
            } else {
                return 1
            }
        })
        
        return sorted
    })()

    return (
        <ul className={styles.IngredientSection}>
            {sortedSection.map((item: any) => {
                return (
                    <li key={item['Name']} className={styles.Ingredient}>
                        <div className={styles.children}>
                            <div></div>
                        </div>
                        <div className={styles.name}>
                            <span>{item['Name']}</span>
                            <Image alt={item['Name']} src={require(`/public/images/ui/${item['Name'].toLowerCase().split(" ").join("-").replaceAll("/", "-")}.webp`)} />
                        </div>
                        <IngredientCheckbox item={item} />
                    </li>
                )
            })}
        </ul>
    )
}