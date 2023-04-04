import styles from './IngredientSection.module.scss'
import Image from 'next/image'
import IngredientCheckbox from '../../../components/inputs/IngredientCheckbox/IngredientCheckbox'
import { Item } from '@/types/index'

export default function IngredientSection (props: {section: Item[]}) {
    const {section} = props

    // Sort ingredients alphabetically before rendering to DOM
    const sortedSection = (() => {
        const sorted = section.sort(function (a: Item, b: Item) {
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
            {sortedSection.map((item: Item) => {
                return (
                    <li key={item['Id']} className={styles.Ingredient}>
                        <div className={styles.info}>
                            <button>
                                <Image alt="Show Varieties" src={require(`/public/images/ui/more_vert.svg`)} width="8" height="64" />
                            </button>
                            <div className={styles.name}>
                                <span>{item['Name']}</span>
                                <Image alt={item['Name']} src={require(`/public/images/ui/${item['Name'].toLowerCase().split(" ").join("-").replaceAll("/", "-")}.webp`)} />
                            </div>
                        </div>
                        <IngredientCheckbox item={item} />
                    </li>
                )
            })}
        </ul>
    )
}