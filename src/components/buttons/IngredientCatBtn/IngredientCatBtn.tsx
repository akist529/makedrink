import styles from './IngredientCatBtn.module.scss'
import Image from 'next/image'

export default function IngredientCatBtn() {
    return (
        <button className={styles.ingCategory}>
            <span>Spirits</span>
        </button>
    )
}