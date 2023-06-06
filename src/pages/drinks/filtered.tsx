// Page styles
import styles from '@/styles/Drinks.module.scss';
// Next components
import type { NextPage } from 'next';
// React components
import { useState } from 'react';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Local components
import DrinkCard from '@/components/ui/DrinksPage/DrinkCard/DrinkCard';
import PaginationLinks from '@/components/ui/DrinksPage/PaginationLinks/PaginationLinks';
// Type interfaces
import { DrinkDict, DrinkInfo, Ingredient, IngredientDict, Item } from '@/types/index';

const FilteredDrinksPage: NextPage = () => {
    const possibleDrinks: DrinkDict = useSelector((state: RootState) => state.drinks.possible);
    const selectedIngredients: IngredientDict = useSelector((state: RootState) => state.ingredients.selected);
    const blockedDrinks = useSelector((state: RootState) => state.drinks.blocked);
    const [firstDrink, setFirstDrink] = useState(0);
    const [lastDrink, setLastDrink] = useState(20);
    const [activePage, setActivePage] = useState(0);

    const drinksList = (() => {
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

    const pageNums = (() => {
        const arr = [];

        for (let i = 0; i < drinksList.length; i++) {
            const firstNum = i;
            const secondNum = ((i + 20) > drinksList.length) ? drinksList.length : (i + 20);
            arr.push(`${firstNum} - ${secondNum}`);
            i += 20;
        }

        return arr;
    })();

    return (
        <>
            { (drinksList.length === 0) && 
                <main className={styles.DrinksPage}>
                    <h1>No drinks available!</h1>
                </main> }
            { (drinksList.length > 0) && 
                <main className={styles.DrinksPage}>
                    <PaginationLinks 
                        pageNums={pageNums} 
                        setFirstDrink={setFirstDrink} 
                        setLastDrink={setLastDrink}
                        activePage={activePage}
                        setActivePage={setActivePage} />
                    <section>
                        <ul>
                            { drinksList.slice(firstDrink, lastDrink).map((drink: DrinkInfo, index: number) => {
                                return (<DrinkCard drink={drink} key={index} />);
                            }) }
                        </ul>
                    </section>
                    <PaginationLinks 
                        pageNums={pageNums} 
                        setFirstDrink={setFirstDrink} 
                        setLastDrink={setLastDrink}
                        activePage={activePage}
                        setActivePage={setActivePage} />
                </main> }
        </>
    );
}

export default FilteredDrinksPage;