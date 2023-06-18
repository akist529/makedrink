// Component styles
import styles from './RecipeItem.module.scss';
// Next components
import Image from 'next/image';
// Type interfaces
import { Item, Ingredient } from '@/types/index';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';
// React components
import { useMemo } from 'react';

export default function RecipeItem (props: { ingredient: Item | Ingredient, missing: boolean, unit: string, amount: number }) {
    const { ingredient, missing, unit, amount } = props;
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
                    src={require(`/public/images/ui/${slug}.webp`)} 
                    width="0" 
                    height="32" 
                    onLoadingComplete={e => updateWidth(e)} />
                <span>{ingredient.Name}</span>
                <span>{`${amount} ${itemUnit}`}</span>
            </div>
        </li>
    );
}