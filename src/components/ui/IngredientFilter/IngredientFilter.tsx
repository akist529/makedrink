// Import styles
import styles from './IngredientFilter.module.scss'
// React components
import { useEffect } from 'react'
// Redux components
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { selectIngredient, unselectIngredient } from '@/store/slices/ingredients.slice'
// Type interfaces
import { Item } from '@/types/index'

export default function IngredientFilter (props: { ingredient: Item, drinkType: string }) {
    const { ingredient, drinkType } = props;
    const dispatch = useDispatch();

    function changeState (e: any, ingredient: Item) {
        if (e.target.checked) {
            dispatch(selectIngredient(ingredient));
        } else {
            dispatch(unselectIngredient(ingredient));
        }
    }

    useEffect(() => {
        const inputs = document.querySelectorAll('input');

        inputs.forEach(input => {
            input.checked = false;
        });
    }, [drinkType, dispatch]);

    return (
        <div className={styles.IngredientFilter}>
            <label htmlFor={ingredient.Name}>{ingredient.Name}</label>
            <input type="checkbox" id={ingredient.Name} name={ingredient.Name} value={ingredient.Name} onClick={(e) => changeState(e, ingredient)}/>
        </div>
    );
}