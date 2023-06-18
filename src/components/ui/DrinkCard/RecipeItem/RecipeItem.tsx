// Component styles
import styles from './RecipeItem.module.scss';
// Type interfaces
import { Item } from '@/types/index';
// Next components
import Image from 'next/image';
// React components
import { useMemo, useCallback } from 'react';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleSubCard, setCardIngredient } from '@/store/slices/subCard.slice';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';
import findItemInStore from '@/helpers/findItemInStore';
import getItemName from '@/helpers/getItemName';

export default function RecipeItem (props: { ingredient: Item, isSub: boolean }) {
    const { ingredient, isSub } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const itemInStore = useMemo(() => findItemInStore(storedIngredients, ingredient.Name), [ingredient.Name, storedIngredients]);
    const displayName = useMemo(() => getItemName(ingredient), [ingredient]);
    const dispatch = useDispatch();

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
        dispatch(setCardIngredient(ingredient));
        dispatch(toggleSubCard());
    }, [dispatch, ingredient]);

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
                src={require(`/public/images/ui/${getSlug(ingredient.Name)}.webp`)} 
                width="0" 
                height="24" 
                onLoadingComplete={e => updateWidth(e)} />
        </li>
    );
}