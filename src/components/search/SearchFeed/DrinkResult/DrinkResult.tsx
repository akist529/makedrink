import styles from './DrinkResult.module.scss';
import { Drink } from '@/types/index';
import Link from 'next/link';
import getSlug from '@/helpers/getSlug';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import findDrinkInStore from '@/helpers/findDrinkInStore';
import Image from 'next/image';
import updateWidth from '@/helpers/updateWidth';

export default function DrinkResult (props: { drink: Drink }) {
    const { drink } = props;
    const slug = getSlug(drink.Name);
    const favoriteDrinks = useSelector((state: RootState) => state.drinks.favorites);
    const isFavorited = findDrinkInStore(favoriteDrinks, drink.Name);
    const imagePath = require('/public/images/ui/cocktail-placeholder.jpg');
    const favoritePath = require('/public/images/ui/favorite.svg');

    return (
        <Link href={`/drink/${slug}`} className={styles.DrinkResult}>
            <div>
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
        </Link>
    );
}