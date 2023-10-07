// Component styles
import styles from './RecipeItem.module.scss';
// Type interfaces
import { Item, Ingredient } from '@/types/index';
// Helper functions
import getSlug from '@/helpers/getSlug';
import getItemName from '@/helpers/getItemName';
// React components
import { useState, useMemo, useCallback } from 'react';

export default function RecipeItem (props: { ingredient: Item | Ingredient, missing: boolean, unit: string, amount: number, prefers: string }) {
    const { ingredient, missing, unit, amount, prefers } = props;
    const slug = useMemo(() => getSlug(ingredient.Name), [ingredient.Name]);
    const [imageSrc, setImageSrc] = useState(`https://img.makedr.ink/i/${slug}.webp`);

    const itemUnit = useMemo(() => {
        if (unit === 'ounce') {
            return 'oz';
        } else {
            return unit;
        }
    }, [unit]);

    const iconExists = useCallback((url: string) => {
        const image = new Image();
        image.src = url;

        if (image.complete) {
            return true;
        } else {
            image.onload = () => {
                return true;
            }

            image.onerror = () => {
                return false;
            }
        }
    }, []);

    return (
        <li className={styles.RecipeItem}>
            <div className={missing? styles.missing : ''}>
                <span
                    className={styles.icon}
                    style={{backgroundImage: `url(${iconExists(imageSrc) ? imageSrc : 'https://img.makedr.ink/i/cocktail.webp'})`}}
                ></span>
                <div className={styles.itemName}>
                    <span>{getItemName(ingredient)}</span>
                    { (ingredient.Name !== prefers) && <span><em>(preferred: {prefers})</em></span> }
                </div>
                <span>{`${amount} ${itemUnit}`}</span>
            </div>
        </li>
    );
}