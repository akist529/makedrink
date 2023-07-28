// Component styles
import styles from './FilterDrinksButton.module.scss'
// React components
import { useCallback } from 'react';

export default function FilterDrinksButton (props: { drinkFilter: string, setDrinkFilter: Function }) {
    const { drinkFilter, setDrinkFilter } = props;

    const changeFilter = useCallback(() => {
        if (drinkFilter === 'cocktail') setDrinkFilter('mocktail');
            else setDrinkFilter('cocktail');
    }, [drinkFilter, setDrinkFilter]);

    return (
        <button title={(drinkFilter === 'cocktail') ? 'Show Mocktails' : 'Show Cocktails'} className={styles.FilterDrinksButton} onClick={changeFilter}>
            <span
                className={drinkFilter === 'cocktail' ? [styles.icon, styles.active].join(' ') : [styles.icon, styles.inactive].join(' ')}
                style={{backgroundImage: `url(/images/ui/local_bar.svg)`}}
            ></span>
            <span
                className={drinkFilter === 'mocktail' ? [styles.icon, styles.active].join(' ') : [styles.icon, styles.inactive].join(' ')}
                style={{backgroundImage: `url(/images/ui/no_drinks.svg)`}}
            ></span>
        </button>
    );
}