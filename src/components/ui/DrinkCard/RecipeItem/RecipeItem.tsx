// Component styles
import styles from './RecipeItem.module.scss';
// Type interfaces
import { Item, Ingredient } from '@/types/index';
// React components
import { useState, useEffect, useMemo, useCallback } from 'react';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleSubCard, setCardIngredient } from '@/store/slices/subCard.slice';
// Helper functions
import getSlug from '@/helpers/getSlug';
import findItemInStore from '@/helpers/findItemInStore';
import getItemName from '@/helpers/getItemName';

export default function RecipeItem (props: { ingredient: Item, isSub: boolean, preferred: Ingredient }) {
    const { ingredient, isSub, preferred } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const itemInStore = useMemo(() => findItemInStore(storedIngredients, ingredient.Name), [ingredient.Name, storedIngredients]);
    const displayName = useMemo(() => getItemName(ingredient), [ingredient]);
    const dispatch = useDispatch();
    const [img, setImg] = useState(`https://img.makedr.ink/i/${getSlug(ingredient.Name)}.webp`);

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setCardIngredient({
            ingredient: ingredient,
            preferred: preferred
        }));
        dispatch(toggleSubCard());
    }, [dispatch, ingredient, preferred]);

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

    useEffect(() => {
        setImg(`https://img.makedr.ink/i/${getSlug(ingredient.Name)}.webp`);
    }, [ingredient]);

    return (
        <li className={styles.RecipeItem}>
            { !isSub && itemInStore && <span>{displayName}</span> }
            { isSub && itemInStore && 
                <div className={styles.altIngredient}>
                    <span>{displayName}</span>
                    <button
                        title='Alternate Ingredient'
                        onClick={(e) => handleClick(e)}
                    ></button>
                </div> }
            { !itemInStore && 
                <div title='Missing Ingredient' className={styles.missingIngredient}>
                    <span>{displayName}</span>
                </div> }
            <span
                className={styles.icon}
                style={{backgroundImage: `url(${iconExists(img) ? img : 'https://img.makedr.ink/i/cocktail.webp'})`}}
            ></span>
        </li>
    );
}