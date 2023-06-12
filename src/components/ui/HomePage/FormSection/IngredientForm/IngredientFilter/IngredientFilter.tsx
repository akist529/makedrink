// Component styles
import styles from './IngredientFilter.module.scss';
// React components
import { MouseEventHandler, useEffect } from 'react';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { selectIngredient, unselectIngredient } from '@/store/slices/ingredients.slice';
// Next components
import Image from 'next/image';
// Type interfaces
import { Item, IngredientDict } from '@/types/index';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function IngredientFilter (props: { ingredient: Item, showImage: boolean }) {
    const { ingredient, showImage } = props;
    const dispatch = useDispatch();
    const selectedIngredients: IngredientDict = useSelector((state: RootState) => state.ingredients.selected);

    function changeState (e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        if (e.currentTarget.checked) {
            dispatch(selectIngredient(ingredient));
        } else {
            dispatch(unselectIngredient(ingredient));
        }
    }

    function slug (item: Item) {
        return `${item.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}`;
    }

    useEffect(() => {
        if (selectedIngredients.hasOwnProperty(ingredient.Type) && 
            selectedIngredients[ingredient.Type].hasOwnProperty(ingredient.Name.charAt(0)) &&
            selectedIngredients[ingredient.Type][ingredient.Name.charAt(0)].find((item: Item) => item.Name === ingredient.Name))
        {
            (document.getElementById(ingredient.Name) as HTMLInputElement).checked = true;
        }
    }, []);

    return (
        <li className={styles.IngredientFilter}>
            <label htmlFor={ingredient.Name}>{ingredient.Name}</label>
            <div>
                { showImage && <Image 
                    alt={ingredient.Name} 
                    src={require(`/public/images/ui/${slug(ingredient)}.webp`)} 
                    width="0" 
                    height="48" 
                    onLoadingComplete={e => updateWidth(e)} /> }
                <input 
                    type="checkbox" 
                    id={ingredient.Name} 
                    name={ingredient.Name} 
                    value={ingredient.Name} 
                    onClick={(e) => changeState(e)} />
            </div>
        </li>
    );
}