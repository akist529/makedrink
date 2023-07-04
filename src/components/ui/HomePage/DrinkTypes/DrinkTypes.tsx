// Component styles
import styles from './DrinkTypes.module.scss';
// Next components
import Image from 'next/image';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { clearSelected } from '@/store/slices/ingredients.slice';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
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
            <button className={drinkType === 'cocktail' ? styles.active : ''} onClick={() => handleClick('cocktail')}>
                <span>Cocktail</span>
                <Image 
                    alt="Cocktail" 
                    src={require('/public/images/ui/local_bar.svg')} 
                    width="0" 
                    height="24" 
                    onLoadingComplete={e => updateWidth(e)} />
            </button>
            <button className={drinkType === 'mocktail' ? styles.active : ''} onClick={() => handleClick('mocktail')}>
                <span>Mocktail</span>
                <Image 
                    alt="Mocktail" 
                    src={require('/public/images/ui/no_drinks.svg')} 
                    width="0" 
                    height="24" 
                    onLoadingComplete={e => updateWidth(e)} />
            </button>
        </nav>
    );
}