import { Item } from '@/types/index'
import styles from './Ingredient.module.scss'
import Image from 'next/image'
import IngredientCheckbox from '@/components/inputs/IngredientCheckbox/IngredientCheckbox'
import { useState, useEffect } from 'react'

export default function Ingredient (props: { item: Item, section: Item[] }) {
    const { item, section } = props
    const [hasChildren, setHasChildren] = useState(false)

    useEffect(() => {
        section.forEach(ingredient => {
            if (ingredient['AliasId'] === item['Id']) {
                setHasChildren(true)
            }
        })
    }, [])

    return (
        <li className={styles.Ingredient}>
            <div className={styles.info}>
                { hasChildren && <button>
                    <Image alt="Show Varieties" src={require(`/public/images/ui/more_vert.svg`)} width="8" height="64" />
                </button> }
                <div className={styles.name}>
                    <span>{item['Name']}</span>
                    <Image alt={item['Name']} src={require(`/public/images/ui/${item['Name'].toLowerCase().split(" ").join("-").replaceAll("/", "-")}.webp`)} />
                </div>
            </div>
            <IngredientCheckbox item={item} />
        </li>
    )
}