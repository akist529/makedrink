import styles from './RecipeItem.module.scss';
import { useState } from 'react';
import Image from 'next/image';

export default function RecipeItem (props: { ingredient: any, missing: boolean }) {
    const { ingredient, missing } = props;
    const slug = ingredient.Name.split(' ').join('-').toLowerCase().replaceAll('/', '-');
    const [itemWidth, setItemWidth] = useState(0);

    const unit = (() => {
        if (ingredient.Amount > 1 && 
        ingredient.Unit[ingredient.Unit.length - 1] !== 's') {
            return `${ingredient.Unit}s`;
        } else {
            return ingredient.Unit;
        }
    })();

    return (
        <li className={styles.RecipeItem}>
            { missing && 
                <>
                <div className={styles.missing}>
                    <span>{ingredient.Alias ? ingredient.Alias : ingredient.Name}</span>
                    <span>{`${ingredient.Amount} ${unit}`}</span>
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
                    <span>{`${ingredient.Amount} ${unit}`}</span>
                </div> }
        </li>
    );
}