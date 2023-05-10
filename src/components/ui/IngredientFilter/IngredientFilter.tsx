// Import styles
import styles from './IngredientFilter.module.scss'
// Redux components
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
// Type interfaces
import { Item } from '@/types/index'

export default function IngredientFilter (props: { type: string }) {
    const { type } = props
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored)

    const filteredIngredients = (() => {
        const filteredIngredients = []

        if (storedIngredients.hasOwnProperty(type)) {
            for (const key of Object.keys(storedIngredients[type])) {
                for (const ingredient of storedIngredients[type][key]) {
                    filteredIngredients.push(ingredient);
                }
            }
        }

        return filteredIngredients;
    })()

    return (
        <div className={styles.IngredientFilter}>
            { filteredIngredients.map((ingredient: Item, index: number) => {
                return <div key={index}>
                    <label htmlFor={ingredient['Name']}>{ingredient['Name']}</label>
                    <input type="checkbox" id={ingredient['Name']} name={ingredient['Name']} value={ingredient['Name']}/>
                </div>
            }) }
        </div>
    )
}