import styles from './LandingSection.module.scss';
import SelectIngredientsButton from '@/components/buttons/SelectIngredientsButton/SelectIngredientsButton';
import MakeDrinkButton from '@/components/buttons/MakeDrinkButton/MakeDrinkButton';
import DrinkTypes from '../DrinkTypes/DrinkTypes';

export default function LandingSection (props: { getRandomDrink: Function, drinkType: string, setDrinkType: Function, drinkError: string, setDrinkError: Function }) {
    const { getRandomDrink, drinkType, setDrinkType, drinkError, setDrinkError } = props;

    return (
        <section id="landing" className={styles.LandingSection}>
            <header>
                <h1>What Can I Make?</h1>
            </header>
            <SelectIngredientsButton />
            <span>Then...</span>
            <nav>
                <div onClick={() => getRandomDrink()}>
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