// Page styles
import styles from '@/styles/Drinks.module.scss';
// Next components
import type { NextPage } from 'next';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import Link from 'next/link';
// React components
import { useState, useEffect, useCallback } from 'react';
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
// Helper functions
import findItemInStore from '@/helpers/findItemInStore';
import findDrinkInStore from '@/helpers/findDrinkInStore';
import findAliasInStore from '@/helpers/findAliasInStore';

const FilteredDrinksPage: NextPage = () => {
    const searchParams = useSearchParams()!;
    const pathname = usePathname();
    const router = useRouter();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // React local state
    const [drinksList, setDrinksList] = useState([] as DrinkInfo[]);
    const [activePage, setActivePage] = useState(() => {
        return Number(urlParams.get('page'));
    });

    // Redux store state
    const possibleDrinks: DrinkDict = useSelector((state: RootState) => state.drinks.possible);
    const blockedDrinks: DrinkDict = useSelector((state: RootState) => state.drinks.blocked);
    const selectedIngredients: IngredientDict = useSelector((state: RootState) => state.ingredients.selected);

    const allDrinks = (() => {
        const arr = [];
        
        for (const key of Object.keys(possibleDrinks)) {
            for (const item of possibleDrinks[key]) {
                if (!findDrinkInStore(blockedDrinks, item.Name)) {
                    const allIngredients = item.Recipe.every((ingredient: Ingredient) => {
                        if (findItemInStore(selectedIngredients, ingredient.Name)) {
                            return true;
                        } else if (findAliasInStore(selectedIngredients, ingredient)) {
                            return true;
                        } else {
                            return false;
                        }
                    });
    
                    if (allIngredients) {
                        arr.push(item);
                    } else {
                        console.log(item);
                    }
                }
            }
        }

        return arr;
    })();

    const numOfPages = Math.ceil(allDrinks.length / 20);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );
    
    useEffect(() => {
        setDrinksList(() => {
            const firstDrink = activePage * 20;
            let lastDrink = firstDrink + 20;

            if (lastDrink > allDrinks.length) {
                lastDrink = allDrinks.length;
            }

            return allDrinks.slice(firstDrink, lastDrink);
        });

        router.push(`${pathname}?` + createQueryString('page', activePage.toString()))
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
                                return (
                                    <DrinkCard key={index} drink={drink} isRandom={false} />
                                );
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