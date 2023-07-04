// Page styles
import styles from '@/styles/Drinks.module.scss';
// Next components
import type { NextPage } from 'next';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import Head from 'next/head';
// React components
import { useState, useEffect, useMemo, useCallback } from 'react';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetAllIngredientsQuery } from '@/store/api/api';
// Local components
import DrinkCard from '@/components/ui/DrinkCard/DrinkCard';
import PaginationLinks from '@/components/ui/DrinksPage/PaginationLinks/PaginationLinks';
import SelectIngredientsLink from '@/components/links/SelectIngredientsLink/SelectIngredientsLink';
import Footer from '@/components/footer/Footer';
import PageCountCtrl from '@/components/ui/DrinksPage/PageCountCtrl/PageCountCtrl';
import FilterDrinksButton from '@/components/buttons/FilterDrinksButton/FilterDrinksButton';
// Type interfaces
import { DrinkDict, DrinkInfo, Item } from '@/types/index';

const PossibleDrinksPage: NextPage = () => {
    const searchParams = useSearchParams()!;
    const pathname = usePathname();
    const router = useRouter();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // React local state
    const [drinksList, setDrinksList] = useState([] as DrinkInfo[]);
    const [activePage, setActivePage] = useState(Number(urlParams.get('page')));
    const [drinkFilter, setDrinkFilter] = useState('cocktail');

    // RTK Queries
    const allIngredients = useGetAllIngredientsQuery();
    const [ingredients, setIngredients] = useState([] as Item[]);    

    useEffect(() => {
        if (allIngredients.isSuccess) {
            setIngredients(allIngredients.data);
        }
    }, [allIngredients]);

    // Redux store state
    const possibleDrinks: DrinkDict = useSelector((state: RootState) => state.drinks.possible);
    const blockedDrinks: DrinkDict = useSelector((state: RootState) => state.drinks.blocked);
    const subCardOpen = useSelector((state: RootState) => state.subCard.open);

    const allDrinks: DrinkInfo[] = useMemo(() => {
        if (allIngredients.data) {
            const arr = [];

            for (const key of Object.keys(possibleDrinks)) {
                for (const item of possibleDrinks[key]) {
                    if (drinkFilter === 'cocktail') {
                        let hasAlcohol = false;
    
                        for (const ingredient of item.Recipe) {
                            const ingredientData = allIngredients.data.find((item: Item) => item.Name === ingredient.Name);
    
                            if (ingredientData) {
                                if (ingredientData.Type === 'liquor' || ingredientData.Type === 'liqueur' || ingredientData.Type === 'other' || ingredientData.Type === 'wine') {
                                    hasAlcohol = true;
                                    break;
                                }
                            }
                        }
    
                        if (!hasAlcohol) continue;
                    }
    
                    if (drinkFilter === 'mocktail') {
                        let hasAlcohol = false;
    
                        for (const ingredient of item.Recipe) {
                            const ingredientData = allIngredients.data.find((item: Item) => item.Name === ingredient.Name);
    
                            if (ingredientData) {
                                if (ingredientData.Type === 'liquor' || ingredientData.Type === 'liqueur' || ingredientData.Type === 'other' || ingredientData.Type === 'wine') {
                                    hasAlcohol = true;
                                    break;
                                }
                            }
                        }
    
                        if (hasAlcohol) continue;
                    }
    
                    if (blockedDrinks.hasOwnProperty(item.Name.charAt(0))) {
                        if (blockedDrinks[item.Name.charAt(0)].find((drink: DrinkInfo) => drink.Name === item.Name)) {
                            continue;
                        }
                    }
                    
                    arr.push(item);
                }
            }
    
            return arr;
        } else {
            return [] as DrinkInfo[];
        }
    }, [allIngredients, blockedDrinks, drinkFilter, possibleDrinks]);

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
    }, [activePage, allDrinks]);

    return (
        <main className={['page', styles.DrinksPage].join(' ')} {...subCardOpen && {style: {height: '100%', overflowY: 'hidden', filter: 'blur(3px)'}}}>
            <Head>
                <title>Possible Drinks - MakeDrink</title>
            </Head>
            { drinksList.length === 0 && 
                <><h1>No drinks possible!</h1>
                <h2>Add some ingredients to your store.</h2>
                <SelectIngredientsLink /></> }
            { drinksList.length > 0 && 
                <>
                <div className={styles.controls}>
                    <PageCountCtrl />
                    <FilterDrinksButton 
                        drinkFilter={drinkFilter} 
                        setDrinkFilter={setDrinkFilter} />
                </div>
                <PaginationLinks 
                    activePage={activePage} 
                    setActivePage={setActivePage} 
                    numOfPages={numOfPages} 
                    loadState={false} />
                <section>
                    <ul>
                    { drinksList.map((drink: DrinkInfo, index: number) => {
                        return (
                            <DrinkCard 
                                key={index} 
                                drink={drink} 
                                isRandom={false} 
                                ingredients={ingredients} />
                        );
                    }) }
                    </ul>
                </section>
                <PaginationLinks 
                    activePage={activePage} 
                    setActivePage={setActivePage} 
                    numOfPages={numOfPages} 
                    loadState={false} />
                <PageCountCtrl /></> }
                <Footer />
        </main>
    );
}

export default PossibleDrinksPage;