// Component styles
import styles from './IngredientSection.module.scss'
// Local components
import Ingredient from '@/components/ui/Ingredient/Ingredient'
// Type interfaces
import { Item } from '@/types/index'
// Redux components
import { useGetAllIngredientsQuery } from '@/store/api/api'

export default function IngredientSection (props: {section: Item[]}) {
    const {section} = props
    const allIngredients = useGetAllIngredientsQuery()

    // Remove ingredients that are variants of another ingredient
    const filteredSection = (() => {
        return section.filter(item => item['AliasId'] === 0)
    })()

    // Sort ingredients alphabetically before rendering to DOM
    const sortedSection = (() => {
        const sorted = filteredSection.sort(function (a: Item, b: Item) {
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
                    <Ingredient
                        key={item['Id']}
                        item={item}
                        section={section}
                    />
                )
            })}
        </ul>
    )
}