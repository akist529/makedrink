// Component styles
import styles from './LandingSection.module.scss';
// Local components
import SelectIngredientsButton from '@/components/buttons/SelectIngredientsButton/SelectIngredientsButton';
import MakeDrinkButton from '@/components/buttons/MakeDrinkButton/MakeDrinkButton';
import DrinkTypes from '../DrinkTypes/DrinkTypes';
// Helper functions
import getRandomDrink from '@/helpers/getRandomDrink';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setRandomDrink } from '@/store/slices/drinks.slice';

export default function LandingSection (props: { drinkType: string, setDrinkType: Function, drinkError: string, setDrinkError: Function }) {
    const { drinkType, setDrinkType, drinkError, setDrinkError } = props;
    const possibleDrinks = useSelector((state: RootState) => state.drinks.possible);
    const randomDrink = useSelector((state: RootState) => state.drinks.random);
    const dispatch = useDispatch();

    function handleClick () {
        const drink = getRandomDrink(possibleDrinks, randomDrink);
        if (!drink) {
            setDrinkError('You don\'t have enough ingredients to make a drink');
        } else {
            dispatch(setRandomDrink(drink));
        }
    }

    return (
        <section id="landing" className={styles.LandingSection}>
            <h1>What Can I Make?</h1>
            <SelectIngredientsButton />
            <span>Then...</span>
            <nav>
                <div onClick={handleClick}>
                    <MakeDrinkButton />
                </div>
                <h2>Or...</h2>
                <DrinkTypes 
                    drinkType={drinkType} 
                    setDrinkType={setDrinkType} 
                    drinkError={drinkError} 
                    setDrinkError={setDrinkError} />
            </nav>
            <strong className={drinkError ? styles.error : ''}>{drinkError}</strong>
        </section>
    );
}