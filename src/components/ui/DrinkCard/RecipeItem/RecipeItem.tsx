// Component styles
import styles from './RecipeItem.module.scss';
// Type interfaces
import { Item, Ingredient } from '@/types/index';
// Next components
import Image from 'next/image';
// React components
import { useState, useEffect, useMemo, useCallback } from 'react';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleSubCard, setCardIngredient } from '@/store/slices/subCard.slice';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
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

    useEffect(() => {
        setImg(`https://img.makedr.ink/i/${getSlug(ingredient.Name)}.webp`);
    }, [ingredient]);

    return (
        <li className={styles.RecipeItem}>
            { !isSub && itemInStore && <span>{displayName}</span> }
            { isSub && itemInStore && 
                <div className={styles.altIngredient}>
                    <span>{displayName}</span>
                    <button onClick={(e) => handleClick(e)}>
                        <Image 
                            alt='Alternate Ingredient' 
                            src={require('/public/images/ui/change_circle.svg')} 
                            width="0" 
                            height="24" 
                            title='Alternate Ingredient' 
                            onLoadingComplete={e => updateWidth(e)} />
                    </button>
                </div> }
            { !itemInStore && 
                <div className={styles.missingIngredient}>
                    <span>{displayName}</span>
                    <Image 
                        alt='Ingredient Missing' 
                        src={require('/public/images/ui/cancel.svg')} 
                        width="0" 
                        height="24" 
                        title='Ingredient Missing' 
                        onLoadingComplete={e => updateWidth(e)} />
                </div> }
            <Image 
                alt={displayName} 
                src={img} 
                width="0" 
                height="24" 
                unoptimized={true} 
                onError={() => setImg('https://img.makedr.ink/i/cocktail.webp')} 
                onLoadingComplete={e => updateWidth(e)} />
        </li>
    );
}