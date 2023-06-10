// Page styles
import styles from '@/styles/Drinks.module.scss';
// Next components
import type { NextPage } from 'next';
import Link from 'next/link';
// React components
import { useState, useEffect } from 'react';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Local components
import DrinkCard from '@/components/ui/DrinkCard/DrinkCard';
import PaginationLinks from '@/components/ui/DrinksPage/PaginationLinks/PaginationLinks';
import MakeDrinkButton from '@/components/buttons/MakeDrinkButton/MakeDrinkButton';
import Footer from '@/components/footer/Footer';
// Type interfaces
import { DrinkDict, DrinkInfo, Ingredient, IngredientDict, Item } from '@/types/index';

const FilteredDrinksPage: NextPage = () => {
    // React local state
    const [drinksList, setDrinksList] = useState([] as DrinkInfo[]);
    const [activePage, setActivePage] = useState(0);

    // Redux store state
    const possibleDrinks: DrinkDict = useSelector((state: RootState) => state.drinks.possible);
    const blockedDrinks: DrinkDict = useSelector((state: RootState) => state.drinks.blocked);
    const selectedIngredients: IngredientDict = useSelector((state: RootState) => state.ingredients.selected);

    const allDrinks = (() => {
        const arr = [];

        for (const key of Object.keys(possibleDrinks)) {
            for (const item of possibleDrinks[key]) {
                if (blockedDrinks.hasOwnProperty(item.Name.charAt(0))) {
                    if (blockedDrinks[item.Name.charAt(0)].find((drink: DrinkInfo) => drink.Name === item.Name)) {
                        continue;
                    }
                }

                if (item.Recipe.every((ingredient: Ingredient) => {
                    for (const type of Object.keys(selectedIngredients)) {
                        for (const key of Object.keys(selectedIngredients[type])) {
                            if (selectedIngredients[type][key].find((item: Item) => item.Name === ingredient.Name)) {
                                return true;
                            }
                        }
                    }

                    return false;
                })) {
                    arr.push(item);
                }
            }
        }

        return arr;
    })();

    const numOfPages = Math.ceil(allDrinks.length / 20);

    useEffect(() => {
        setDrinksList(() => {
            const firstDrink = activePage * 20;
            let lastDrink = firstDrink + 20;

            if (lastDrink > allDrinks.length) {
                lastDrink = allDrinks.length;
            }

            return allDrinks.slice(firstDrink, lastDrink);
        });
    }, [activePage]);

    return (
        <>
            { (drinksList.length === 0) && 
                <main className={styles.DrinksPage}>
                    <h1>No drinks available!</h1>
                    <h2>Filter for specific ingredients you want to use.</h2>
                    <Link href='/'>
                        <nav>
                            <MakeDrinkButton />
                        </nav>
                    </Link>
                    <Footer />
                </main> }
            { (drinksList.length > 0) && 
                <main className={styles.DrinksPage}>
                    <PaginationLinks 
                        activePage={activePage} 
                        setActivePage={setActivePage} 
                        numOfPages={numOfPages} 
                        loadState={false} />
                    <section>
                        <ul>
                            { drinksList.map((drink: DrinkInfo, index: number) => {
                                return (<DrinkCard drink={drink} key={index} />);
                            }) }
                        </ul>
                    </section>
                    <PaginationLinks 
                        activePage={activePage} 
                        setActivePage={setActivePage} 
                        numOfPages={numOfPages} 
                        loadState={false} />
                    <Footer />
                </main> }
        </>
    );
}

export default FilteredDrinksPage;