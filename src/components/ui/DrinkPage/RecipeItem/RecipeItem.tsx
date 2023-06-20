// Component styles
import styles from './RecipeItem.module.scss';
// Next components
import Image from 'next/image';
// Type interfaces
import { Item, Ingredient } from '@/types/index';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';
import getItemName from '@/helpers/getItemName';
// React components
import { useMemo } from 'react';

export default function RecipeItem (props: { ingredient: Item | Ingredient, missing: boolean, unit: string, amount: number, prefers: string }) {
    const { ingredient, missing, unit, amount, prefers } = props;
    const slug = useMemo(() => getSlug(ingredient.Name), [ingredient.Name]);

    const itemUnit = useMemo(() => {
        if (unit === 'ounce') {
            return 'oz';
        } else {
            return unit;
        }
    }, [unit]);

    return (
        <li className={styles.RecipeItem}>
            <div className={missing? styles.missing : ''}>
                <Image 
                    alt={ingredient.Name} 
                    src={`https://img.makedr.ink/i/${slug}.webp`} 
                    width="0" 
                    height="32" 
                    onLoadingComplete={e => updateWidth(e)} 
                    unoptimized />
                <div className={styles.itemName}>
                    <span>{getItemName(ingredient)}</span>
                    { (ingredient.Name !== prefers) && <span><em>(preferred: {prefers})</em></span> }
                </div>
                <span>{`${amount} ${itemUnit}`}</span>
            </div>
        </li>
    );
}