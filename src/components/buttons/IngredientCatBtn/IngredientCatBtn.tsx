import styles from './IngredientCatBtn.module.scss'
import Image from 'next/image'

export default function IngredientCatBtn(props: any) {
    const { category, color } = props

    return (
        <button className={[styles.ingCategory, styles[`${color}`]].join(" ")}>
            <span>{category}</span>
            <Image alt={category} src={require(`/public/images/ui/${category.toLowerCase()}.webp`)} width="64" height="64" />
        </button>
    )
}