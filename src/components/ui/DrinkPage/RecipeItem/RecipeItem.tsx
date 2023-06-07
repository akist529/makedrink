import styles from './RecipeItem.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import { Item, Ingredient } from '@/types/index';

export default function RecipeItem (props: { ingredient: Item | Ingredient, missing: boolean, unit: string, amount: number }) {
    const { ingredient, missing, unit, amount } = props;
    const slug = ingredient.Name.split(' ').join('-').toLowerCase().replaceAll('/', '-');
    const [itemWidth, setItemWidth] = useState(0);

    const itemUnit = (() => {
        if (unit === 'ounce') {
            return 'oz';
        } else {
            return unit;
        }
    })();

    return (
        <li className={styles.RecipeItem}>
            { missing && 
                <>
                <div className={styles.missing}>
                    <span>{ingredient.Name}</span>
                    <span>{`${amount} ${itemUnit}`}</span>
                </div>
                <Image 
                    alt='Ingredient Missing'
                    src={require('public/images/ui/cancel.svg')}
                    width="24"
                    height="24"
                    title="Missing Ingredient" />
                </> }
            { !missing && 
                <div>
                    <Image 
                        alt={ingredient.Name} 
                        src={require(`/public/images/ui/${slug}.webp`)} 
                        width={itemWidth} 
                        height="32" 
                        onLoadingComplete={e => setItemWidth(e.naturalWidth)} />
                    <span>{ingredient.Name}</span>
                    <span>{`${amount} ${itemUnit}`}</span>
                </div> }
        </li>
    );
}