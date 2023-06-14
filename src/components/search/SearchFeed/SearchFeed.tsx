import styles from './SearchFeed.module.scss';
import IngredientResult from './IngredientResult/IngredientResult';
import DrinkResult from './DrinkResult/DrinkResult';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetAllIngredientsQuery, useGetAllDrinksQuery } from '@/store/api/api';
import { useState, useEffect } from 'react';
import { Item, Drink } from '@/types/index';

export default function SearchFeed () {
    const query = useSelector((state: RootState) => state.search.query);
    const allIngredients = useGetAllIngredientsQuery();
    const allDrinks = useGetAllDrinksQuery();
    const [ingredientData, setIngredientData] = useState([] as Item[]);
    const [drinkData, setDrinkData] = useState([] as Drink[]);
    const [ingredientResults, setIngredientResults] = useState([] as Item[]);
    const [drinkResults, setDrinkResults] = useState([] as Drink[]);

    useEffect(() => {
        if (allIngredients.isSuccess) {
            setIngredientData(allIngredients.data);
        }
    }, [allIngredients]);

    useEffect(() => {
        if (allDrinks.isSuccess) {
            setDrinkData(allDrinks.data);
        }
    }, [allDrinks]);

    useEffect(() => {
        
    }, [query]);

    return (
        <div className={styles.SearchFeed}>

        </div>
    );
}