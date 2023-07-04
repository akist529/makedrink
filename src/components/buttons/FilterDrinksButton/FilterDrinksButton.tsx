import styles from './FilterDrinksButton.module.scss'
import Image from 'next/image';
import { useCallback } from 'react';

export default function FilterDrinksButton (props: { drinkFilter: string, setDrinkFilter: Function }) {
    const { drinkFilter, setDrinkFilter } = props;

    const changeFilter = useCallback(() => {
        if (drinkFilter === 'cocktail') setDrinkFilter('mocktail');
            else setDrinkFilter('cocktail');
    }, [drinkFilter, setDrinkFilter]);

    return (
        <button className={styles.FilterDrinksButton} onClick={changeFilter} title="Filter Drinks">
            <Image 
                alt="Filter Drinks" 
                src={require('/public/images/ui/local_bar.svg')} 
                width={32} 
                height={32} 
                unoptimized 
                className={drinkFilter === 'cocktail' ? styles.active : styles.inactive} />
            <Image 
                alt="Filter Drinks" 
                src={require('/public/images/ui/no_drinks.svg')} 
                width={32} 
                height={32} 
                unoptimized 
                className={drinkFilter === 'mocktail' ? styles.active : styles.inactive} />
        </button>
    );
}