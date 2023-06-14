import styles from './SearchFeed.module.scss';
import IngredientResult from './IngredientResult/IngredientResult';
import DrinkResult from './DrinkResult/DrinkResult';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetAllIngredientsQuery, useGetAllDrinksQuery } from '@/store/api/api';
import { useState, useEffect } from 'react';
import { Item, Drink } from '@/types/index';
import { toggleSearch } from '@/store/slices/search.slice';
import itemIsAlias from '@/helpers/itemIsAlias';

export default function SearchFeed () {
    const query = useSelector((state: RootState) => state.search.query);
    const navMenuOpen = useSelector((state: RootState) => state.navMenu.navMenuOpen);
    const searchOpen = useSelector((state: RootState) => state.search.searchOpen);
    const allIngredients = useGetAllIngredientsQuery();
    const allDrinks = useGetAllDrinksQuery();
    const [ingredientData, setIngredientData] = useState([] as Item[]);
    const [drinkData, setDrinkData] = useState([] as Drink[]);
    const [ingredientResults, setIngredientResults] = useState([] as Item[]);
    const [drinkResults, setDrinkResults] = useState([] as Drink[]);
    const dispatch = useDispatch();
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    useEffect(() => {
        if (allIngredients.isSuccess) {
            setIngredientData(allIngredients.data);
        }
    }, [allIngredients]);

    useEffect(() => {
        if (allDrinks.isSuccess) {
            setDrinkData(allDrinks.data.Drinks);
        }
    }, [allDrinks]);

    useEffect(() => {
        setIngredientResults(() => {
            if (!query.length) {
                return [];
            }

            const results: Item[] = [];

            for (const ingredient of ingredientData) {
                if (query.split('').every((letter: string, index: number) => {
                    const regEx = new RegExp(ingredient.Name[index], "gi");
                    return letter.match(regEx);
                })) {
                    results.push(ingredient);
                }
            }

            return results;
        });

        setDrinkResults(() => {
            if (!query.length) {
                return [];
            }

            const results: Drink[] = [];

            for (const drink of drinkData) {
                if (query.split('').every((letter: string, index: number) => {
                    const regEx = new RegExp(drink.Name[index], "gi");
                    return letter.match(regEx);
                })) {
                    results.push(drink);
                }
            }

            return results;
        });
    }, [query]);

    useEffect(() => {
        dispatch(toggleSearch());
    }, [navMenuOpen]);

    useEffect(() => {
        if (ingredientData.length > 0) {
            setIngredientData(prevState => 
                prevState.filter((item: Item) => {
                if (!item.AliasId && itemIsAlias(storedIngredients, item)) {
                    return false;
                } else {
                    return true;
                }
            }));
        }
    }, [ingredientData]);

    return (
        <>
            { (ingredientResults.length > 0 || drinkResults.length > 0) && 
                <div className={styles.SearchFeed}>
                    { ingredientResults.length > 0 && <h1>Ingredients</h1> }
                    { ingredientResults.map((ingredient: Item, index: number) => {
                        return (
                            <IngredientResult key={index} ingredient={ingredient} />
                        );
                    }) }
                    { (drinkResults.length > 0) && <h1>Drinks</h1> }
                    { drinkResults.map((drink: Drink, index: number) => {
                        return (
                            <DrinkResult key={index} drink={drink} />
                        );
                    }) }
                </div> }
        </>
    );
}