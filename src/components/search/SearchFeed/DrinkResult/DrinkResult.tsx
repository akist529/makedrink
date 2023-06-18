// Component styles
import styles from './DrinkResult.module.scss';
// Type interfaces
import { Drink } from '@/types/index';
// Helper functions
import findDrinkInStore from '@/helpers/findDrinkInStore';
import updateWidth from '@/helpers/updateWidth';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Next components
import Image from 'next/image';
// React components
import { useMemo } from 'react';

export default function DrinkResult (props: { drink: Drink }) {
    const { drink } = props;

    // Redux state
    const favoriteDrinks = useSelector((state: RootState) => state.drinks.favorites);
    
    const isFavorited = useMemo(() => findDrinkInStore(favoriteDrinks, drink.Name), [drink.Name, favoriteDrinks]);

    return (
        <div className={styles.DrinkResult}>
            <span>{drink.Name}</span>
            { isFavorited && <Image 
                className={styles.favorite}
                alt='Favorite Status' 
                src={require('/public/images/ui/favorite.svg')} 
                width="0" 
                height="36" 
                onLoadingComplete={e => updateWidth(e)} /> }
            <Image 
                className={styles.preview}
                alt={drink.Name} 
                src={require('/public/images/ui/cocktail-placeholder.jpg')} 
                width="0" 
                height="48" 
                onLoadingComplete={e => updateWidth(e)} />
        </div>
    );
}