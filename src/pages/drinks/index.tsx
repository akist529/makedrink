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
import { useGetAllDrinksQuery, useGetAllDrinkInfoQuery, useLazyGetMultipleDrinkInfoQuery, useGetAllIngredientsQuery } from '@/store/api/api';
// Local components
import DrinkCard from '@/components/ui/DrinkCard/DrinkCard';
import PaginationLinks from '@/components/ui/DrinksPage/PaginationLinks/PaginationLinks';
import Footer from '@/components/footer/Footer';
import LoadingAnimation from '@/components/loading/LoadingAnimation';
import PageCountCtrl from '@/components/ui/DrinksPage/PageCountCtrl/PageCountCtrl';
import FilterDrinksButton from '@/components/buttons/FilterDrinksButton/FilterDrinksButton';
// Type interfaces
import { Drink, DrinkInfo, Item } from '@/types/index';

const AllDrinksPage: NextPage = () => {
    const searchParams = useSearchParams()!;
    const pathname = usePathname();
    const router = useRouter();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // React local state
    const [drinkInfo, setDrinkInfo] = useState([] as DrinkInfo[]);
    const [activePage, setActivePage] = useState(() => Number(urlParams.get('page')));
    const [isLoading, setIsLoading] = useState(true);
    const [drinkFilter, setDrinkFilter] = useState('cocktail');

    // Redux store state
    const blockedDrinks = useSelector((state: RootState) => state.drinks.blocked);
    const drinksPerPage = useSelector((state: RootState) => state.drinks.drinksPerPage);
    const subCardOpen = useSelector((state: RootState) => state.subCard.open);

    // RTK Queries
    const allDrinks = useGetAllDrinksQuery();
    const allDrinkInfo = useGetAllDrinkInfoQuery();
    const allIngredients = useGetAllIngredientsQuery();
    const [getPageInfo, pageInfoResult] = useLazyGetMultipleDrinkInfoQuery();

    const ingredients = useMemo(() => {
        if (allIngredients.isSuccess) {
            return allIngredients.data;
        } else return [] as Item[];
    }, [allIngredients]);

    const drinksList = useMemo(() => {
        if (allDrinks.isSuccess && allDrinkInfo.isSuccess && allIngredients.isSuccess) {
            const data = allDrinks.data.Drinks as Drink[];

            const filteredData = data.filter((drink: Drink) => {
                const info = allDrinkInfo.data.find((item: DrinkInfo) => item.Name === drink.Name);

                if (drinkFilter === 'cocktail') {
                    let hasAlcohol = false;

                    for (const ingredient of info.Recipe) {
                        const ingredientData = allIngredients.data.find((item: Item) => item.Name === ingredient.Name);

                        if (ingredientData) {
                            if (ingredientData.Type === 'liquor' || ingredientData.Type === 'liqueur' || ingredientData.Type === 'other' || ingredientData.Type === 'wine') {
                                hasAlcohol = true;
                                break;
                            }
                        }
                    }

                    if (!hasAlcohol) return false;
                }

                if (drinkFilter === 'mocktail') {
                    for (const ingredient of info.Recipe) {
                        const ingredientData = allIngredients.data.find((item: Item) => item.Name === ingredient.Name);

                        if (ingredientData) {
                            if (ingredientData.Type === 'liquor' || ingredientData.Type === 'liqueur' || ingredientData.Type === 'other' || ingredientData.Type === 'wine') {
                                return false;
                            }
                        }
                    }
                }
                
                const key = drink.Name.charAt(0);

                if (blockedDrinks.hasOwnProperty(key)) {
                    const drinkIsBlocked = blockedDrinks[key].find((item: DrinkInfo) => drink.Name === item.Name);
                    if (drinkIsBlocked) return false;
                }

                return true;
            });

            return filteredData;
        } else {
            return [] as Drink[];
        }
    }, [allDrinks, blockedDrinks, allIngredients, allDrinkInfo, drinkFilter]);

    const fetchDrinkInfo = useCallback(() => {
        const firstDrink = activePage * drinksPerPage;
        let lastDrink = firstDrink + drinksPerPage;

        if (lastDrink > drinksList.length) lastDrink = drinksList.length;

        const drinkIds: number[] = [];

        for (const drink of drinksList.slice(firstDrink, lastDrink)) drinkIds.push(drink.Id);

        getPageInfo(drinkIds);
    }, [activePage, drinksList, drinksPerPage, getPageInfo]);

    useEffect(() => {
        if (drinksList.length > 0) fetchDrinkInfo();
    }, [drinksList, drinksPerPage, fetchDrinkInfo]);

    useEffect(() => {
        if (pageInfoResult.data) { 
            setDrinkInfo(pageInfoResult.data);
            setIsLoading(false);
        };
    }, [pageInfoResult]);

    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        return params.toString();
    }, [searchParams]);

    useEffect(() => {
        if (drinkInfo.length > 0) {
            setIsLoading(true);
            fetchDrinkInfo();
            router.push(`${pathname}?` + createQueryString('page', activePage.toString()));
        }
    }, [activePage]);

    const isError = useMemo(() => {
        if (allDrinks.isError) {
            return true;
        } else if (allIngredients.isError) {
            return true;
        } else if (pageInfoResult.isError) {
            return true;
        }
        
        return false;
    }, [allDrinks, allIngredients, pageInfoResult]);

    const numOfPages = useMemo(() => {
        if (drinksList.length > 0) {
            return Math.ceil(drinksList.length / drinksPerPage);
        } else return 0;
    }, [drinksList, drinksPerPage]);

    return (
        <main className={['page', styles.DrinksPage].join(' ')} {...subCardOpen && {style: {height: '100%', overflowY: 'hidden', filter: 'blur(3px)'}}} {...isLoading && {style: {cursor: 'wait'}}}>
            <Head>
                <title>All Drinks - MakeDrink</title>
            </Head>
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
                loadState={isLoading}
            />
            { isLoading && 
                <LoadingAnimation /> }
            { !isLoading && isError && 
                <><h1>Error!</h1>
                <h2>Try again later.</h2></> }
            { !isLoading && !isError && !drinksList.length && 
                <><h1>No drinks available!</h1>
                <h2>There seems to be an error - try again later.</h2></> }
            { !isLoading && !isError && drinksList.length > 0 && 
                <>
                { isLoading && 
                    <LoadingAnimation /> }
                { !isLoading && 
                    <><section>
                        <ul>
                        { drinkInfo.map((drink: DrinkInfo, index: number) => {
                            return (
                                <DrinkCard 
                                    key={index} 
                                    drink={drink} 
                                    isRandom={false} 
                                    ingredients={ingredients}
                                />
                            );
                        }) }
                        </ul>
                    </section>
                    <PaginationLinks 
                        activePage={activePage} 
                        setActivePage={setActivePage} 
                        numOfPages={numOfPages} 
                        loadState={pageInfoResult.isLoading}
                    />
                    <PageCountCtrl />
                    <Footer /></> }
                </> }
        </main>
    );
}

export default AllDrinksPage;