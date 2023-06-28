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
import Link from 'next/link';
// React components
import { useMemo } from 'react';

export default function DrinkResult (props: { drink: Drink, link: string }) {
    const { drink, link } = props;
    const favoriteDrinks = useSelector((state: RootState) => state.drinks.favorites);
    const isFavorited = useMemo(() => findDrinkInStore(favoriteDrinks, drink.Name), [drink.Name, favoriteDrinks]);

    return (
        <li>
            <Link href={link} className={styles.DrinkResult}>
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
            </Link>
        </li>
    );
}