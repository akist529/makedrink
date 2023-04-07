// Component styles
import styles from './IngredientCatBtn.module.scss'
// Next components
import Image from 'next/image'

export default function IngredientCatBtn(props: {category: string, color: string}) {
    // Import props
    const { category, color } = props

    const btnStyles = [styles.ingCategory, styles[`${color}`]].join(' ')
    const imagePath = require(`/public/images/ui/${category.toLowerCase()}.webp`)
    
    return (
        <button className={btnStyles}>
            <span>{category}</span>
            <Image alt={category} src={imagePath} width="64" height="64" />
        </button>
    )
}