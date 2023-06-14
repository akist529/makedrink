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

export default function DrinkResult (props: { drink: Drink }) {
    const { drink } = props;

    // Redux state
    const favoriteDrinks = useSelector((state: RootState) => state.drinks.favorites);
    
    const isFavorited = findDrinkInStore(favoriteDrinks, drink.Name);
    const imagePath = require('/public/images/ui/cocktail-placeholder.jpg');
    const favoritePath = require('/public/images/ui/favorite.svg');

    return (
        <div className={styles.DrinkResult}>
            <span>{drink.Name}</span>
            { isFavorited && <Image 
                className={styles.favorite}
                alt='Favorite Status' 
                src={favoritePath} 
                width="0" 
                height="36" 
                onLoadingComplete={e => updateWidth(e)} /> }
            <Image 
                className={styles.preview}
                alt={drink.Name} 
                src={imagePath} 
                width="0" 
                height="48" 
                onLoadingComplete={e => updateWidth(e)} />
        </div>
    );
}