import styles from './IngredientSection.module.scss'
import Image from 'next/image'
import Ingredient from '@/components/ui/Ingredient/Ingredient'
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
                    <Ingredient key={item['Id']} item={item} />
                )
            })}
        </ul>
    )
}