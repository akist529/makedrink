// Component styles
import styles from './DrinkTypes.module.scss';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { clearSelected } from '@/store/slices/ingredients.slice';
// React components
import { useEffect, useCallback } from 'react';

export default function DrinkTypes (props: { drinkType: string, setDrinkType: Function, drinkError: string, setDrinkError: Function }) {
    const { drinkType, setDrinkType, drinkError, setDrinkError } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const dispatch = useDispatch();

    const handleClick = useCallback((type: string) => {
        if (Object.keys(storedIngredients).length > 0) {
            setDrinkType(type);
        } else setDrinkError('You don\'t have enough ingredients to make a drink!');
    }, [setDrinkError, setDrinkType, storedIngredients]);

    useEffect(() => {
        if (drinkType) dispatch(clearSelected());
    }, [drinkType, dispatch]);

    return (
        <nav className={styles.DrinkTypes}>
            <button
                id={styles.cocktailBtn}
                className={drinkType === 'cocktail' ? styles.active : ''}
                onClick={() => handleClick('cocktail')}
            >Cocktail</button>
            <button
                id={styles.mocktailBtn}
                className={drinkType === 'mocktail' ? styles.active : ''}
                onClick={() => handleClick('mocktail')}
            >Mocktail</button>
        </nav>
    );
}