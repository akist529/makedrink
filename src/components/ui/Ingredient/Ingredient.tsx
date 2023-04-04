import { Item } from '@/types/index'
import styles from './Ingredient.module.scss'
import Image from 'next/image'
import IngredientCheckbox from '@/components/inputs/IngredientCheckbox/IngredientCheckbox'
import { useState, useEffect } from 'react'

export default function Ingredient (props: { item: Item, section: Item[], setIngredientModalOpen: Function }) {
    const { item, section, setIngredientModalOpen } = props
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
                { hasChildren && <Image className={styles.children} alt="Show Varieties" src={require(`/public/images/ui/more_vert.svg`)} width="8" height="64" /> }
                <div className={styles.icon}>
                    <Image alt={item['Name']} src={require(`/public/images/ui/${item['Name'].toLowerCase().split(" ").join("-").replaceAll("/", "-")}.webp`)} />
                </div>
                <IngredientCheckbox item={item} />
            </div>
            <span>{item['Name']}</span>
        </li>
    )
}