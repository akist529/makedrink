// Component styles
import styles from './IngredientFilter.module.scss';
// React components
import { useState, useEffect, useMemo, useCallback, useId } from 'react';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { selectIngredient, unselectIngredient } from '@/store/slices/ingredients.slice';
// Type interfaces
import { Item } from '@/types/index';
// Helper functions
import getSlug from '@/helpers/getSlug';
import getItemName from '@/helpers/getItemName';
import notNullish from '@/helpers/notNullish';

export default function IngredientFilter (props: { ingredient: Item, showImage: boolean }) {
    const { ingredient, showImage } = props;
    const dispatch = useDispatch();

    // Redux store state
    const selectedIngredients = useSelector((state: RootState) => state.ingredients.selected);
    
    const name = useMemo(() => {
        return getSlug(ingredient.Name);
    }, [ingredient]);

    // React local state
    const [imageSrc, setImageSrc] = useState(`https://img.makedr.ink/i/${name}.webp`);

    const displayName = useMemo(() => getItemName(ingredient), [ingredient]);
    const id = useId();
    const changeState = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) dispatch(selectIngredient(ingredient));
        else dispatch(unselectIngredient(ingredient));
    }, [dispatch, ingredient]);

    useEffect(() => {
        const type = ingredient.Type || '';
        const key = ingredient.Name.charAt(0);

        if (notNullish(selectedIngredients, type) && notNullish(selectedIngredients[type], key))
        {
            const items = selectedIngredients[type][key];
            const foundIngredient = items.find((item: Item) => item.Name === ingredient.Name);

            if (foundIngredient) {
                const checkbox = document.getElementById(displayName) as HTMLInputElement;
                if (checkbox) checkbox.checked = true;
            }
        }
    }, [displayName, ingredient.Name, ingredient.Type, selectedIngredients]);

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
        <li className={styles.IngredientFilter}>
            <label htmlFor={id}>{displayName}</label>
            <div {...showImage && {style:{gridTemplateColumns: '48px auto'}}}>
            { showImage && 
                <span
                    className={styles.icon}
                    style={{backgroundImage: `url(${iconExists(imageSrc) ? imageSrc : 'https://img.makedr.ink/i/cocktail.webp'})`}}
                ></span> }
                <input 
                    type="checkbox" 
                    id={id} 
                    name={displayName} 
                    value={displayName} 
                    onClick={e => changeState(e)} />
            </div>
        </li>
    );
}