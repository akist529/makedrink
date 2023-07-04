// Component styles
import styles from './DrinkSection.module.scss';
// Local components
import DrinkCard from '../../DrinkCard/DrinkCard';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetAllIngredientsQuery } from '@/store/api/api';
// Type interfaces
import { Item } from '@/types/index';
// React components
import { useState, useEffect } from 'react';

export default function DrinkSection () {
    const randomDrink = useSelector((state: RootState) => state.drinks.random);

    // RTK Queries
    const allIngredients = useGetAllIngredientsQuery();
    const [ingredients, setIngredients] = useState([] as Item[]);    

    useEffect(() => {
        if (allIngredients.isSuccess) {
            setIngredients(allIngredients.data);
        }
    }, [allIngredients]);

    return (
        <section data-testid="drink-section" id='drink' className={styles.DrinkSection}>
        { (Object.keys(randomDrink).length > 0) && 
            <DrinkCard 
                drink={randomDrink} 
                isRandom={true} 
                ingredients={ingredients} /> }
        </section>
    );
}