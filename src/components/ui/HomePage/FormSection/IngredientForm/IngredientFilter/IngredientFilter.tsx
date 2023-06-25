// Component styles
import styles from './IngredientFilter.module.scss';
// React components
import { useState, useEffect, useMemo, useCallback } from 'react';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { selectIngredient, unselectIngredient } from '@/store/slices/ingredients.slice';
// Next components
import Image from 'next/image';
// Type interfaces
import { Item } from '@/types/index';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';
import getItemName from '@/helpers/getItemName';
import findItemById from '@/helpers/findItemById';
import findAltInStore from '@/helpers/findAltInStore';

export default function IngredientFilter (props: { ingredient: Item, showImage: boolean }) {
    const { ingredient, showImage } = props;
    const dispatch = useDispatch();
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const selectedIngredients = useSelector((state: RootState) => state.ingredients.selected);
    const displayName = useMemo(() => getItemName(ingredient), [ingredient]);
    const [imageSrc, setImageSrc] = useState(`https://img.makedr.ink/i/${getSlug(ingredient.Name)}.webp`);

    const changeState = useCallback((e: React.MouseEvent<HTMLInputElement,MouseEvent>) => {
        if (e.currentTarget.checked) {
            dispatch(selectIngredient(ingredient));
            
            // if (ingredient.AliasId) {
            //     const alias = findItemById(storedIngredients, ingredient.AliasId);
                
            //     if (alias) {
            //         dispatch(selectIngredient(alias));
            //     }
            // }
        } else {
            dispatch(unselectIngredient(ingredient));

            // if (ingredient.AliasId) {
            //     const alias = findItemById(storedIngredients, ingredient.AliasId);

            //     if (alias) {
            //         const alt = findAltInStore(storedIngredients, alias, ingredient.Name);

            //         if (!alt) {
            //             dispatch(unselectIngredient(alias));
            //         }
            //     }
            // }
        }
    }, [dispatch, ingredient, storedIngredients]);

    useEffect(() => {
        const type = ingredient.Type || '';

        if (selectedIngredients.hasOwnProperty(type) && 
            selectedIngredients[type].hasOwnProperty(ingredient.Name.charAt(0)) &&
            selectedIngredients[type][ingredient.Name.charAt(0)].find((item: Item) => item.Name === ingredient.Name))
        {
            (document.getElementById(displayName) as HTMLInputElement).checked = true;
        }
    }, [displayName, ingredient.Name, ingredient.Type, selectedIngredients]);

    return (
        <li className={styles.IngredientFilter}>
            <label htmlFor={displayName}>{displayName}</label>
            <div>
                { showImage && 
                <Image 
                    alt={displayName} 
                    src={imageSrc} 
                    width="0" 
                    height="48" 
                    onError={() => setImageSrc('https://img.makedr.ink/i/cocktail.webp')} 
                    onLoadingComplete={e => updateWidth(e)} 
                    unoptimized /> }
                <input 
                    type="checkbox" 
                    id={displayName} 
                    name={displayName} 
                    value={displayName} 
                    onClick={(e) => changeState(e)} />
            </div>
        </li>
    );
}