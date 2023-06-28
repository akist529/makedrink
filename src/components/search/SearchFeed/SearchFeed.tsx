// Component styles
import styles from './SearchFeed.module.scss';
// Local components
import DrinkResult from './DrinkResult/DrinkResult';
import IngredientList from '@/components/ui/IngredientsPage/IngredientsSection/IngredientList/IngredientList';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetAllIngredientsQuery, useGetAllDrinksQuery } from '@/store/api/api';
import { toggleSearch } from '@/store/slices/search.slice';
// React components
import { useState, useEffect, useDeferredValue } from 'react';
// Type interfaces
import { Item, Drink } from '@/types/index';
// Helper functions
import itemIsAlias from '@/helpers/itemIsAlias';
import getSlug from '@/helpers/getSlug';
// Next components
import { useRouter } from 'next/router';

export default function SearchFeed () {
    const router = useRouter();

    // Redux store state
    const query = useSelector((state: RootState) => state.search.query);
    const deferredQuery = useDeferredValue(query);
    const navMenuOpen = useSelector((state: RootState) => state.navMenu.navMenuOpen);
    const searchOpen = useSelector((state: RootState) => state.search.searchOpen);
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const dispatch = useDispatch();

    // RTK Queries
    const allIngredients = useGetAllIngredientsQuery();
    const allDrinks = useGetAllDrinksQuery();

    // React local state
    const [ingredientData, setIngredientData] = useState([] as Item[]);
    const [drinkData, setDrinkData] = useState([] as Drink[]);
    const [ingredientResults, setIngredientResults] = useState([] as Item[]);
    const [drinkResults, setDrinkResults] = useState([] as Drink[]);

    useEffect(() => {
        if (allIngredients.isSuccess) {
            const filtered = allIngredients.data.filter((item: Item) => {
                if (!item.AliasId && itemIsAlias(storedIngredients, item)) {
                    return false;
                } else {
                    return true;
                }
            });

            setIngredientData(filtered);
        }
    }, [allIngredients, storedIngredients]);

    useEffect(() => {
        if (allDrinks.isSuccess) {
            setDrinkData(allDrinks.data.Drinks);
        }
    }, [allDrinks]);

    useEffect(() => {
        setIngredientResults(() => {
            if (!deferredQuery.length) {
                return [];
            }

            const results: Item[] = [];

            for (const ingredient of ingredientData) {
                if (deferredQuery.split('').every((letter: string, index: number) => {
                    const regEx = new RegExp(ingredient.Name[index], "gi");
                    if (letter === 'a' && ingredient.Name[index] === 'ä') {
                        return true;
                    }

                    return letter.match(regEx);
                })) {
                    results.push(ingredient);
                }
            }

            return results;
        });

        setDrinkResults(() => {
            if (!deferredQuery.length) {
                return [];
            }

            const results: Drink[] = [];

            for (const drink of drinkData) {
                if (deferredQuery.split('').every((letter: string, index: number) => {
                    const regEx = new RegExp(drink.Name[index], "gi");

                    if (letter === 'a' && drink.Name[index] === 'ä') {
                        return true;
                    }

                    return letter.match(regEx);
                })) {
                    results.push(drink);
                }
            }

            return results;
        });
    }, [deferredQuery, drinkData, ingredientData]);

    useEffect(() => {
        dispatch(toggleSearch());
    }, [navMenuOpen, router.asPath, dispatch]);

    return (
        <>
        { (ingredientResults.length > 0 || drinkResults.length > 0) && 
            <nav className={styles.SearchFeed}>
                { ingredientResults.length > 0 && <h1>Ingredients</h1> }
                <IngredientList section={ingredientResults} />
                { (drinkResults.length > 0) && <h1>Drinks</h1> }
                <ul>
                    { drinkResults.map((drink: Drink, index: number) => {
                        return (
                            <DrinkResult 
                                key={index} 
                                drink={drink} 
                                link={`/drink/${getSlug(drink.Name)}`} />
                        );
                    }) }
                </ul>
            </nav> }
        </>
    );
}