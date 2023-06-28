// Page styles
import styles from '@/styles/Drinks.module.scss';
// Next components
import type { NextPage } from 'next';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import Head from 'next/head';
// React components
import { useState, useEffect, useCallback } from 'react';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetAllDrinksQuery, useLazyGetMultipleDrinkInfoQuery, useGetAllIngredientsQuery } from '@/store/api/api';
// Local components
import DrinkCard from '@/components/ui/DrinkCard/DrinkCard';
import PaginationLinks from '@/components/ui/DrinksPage/PaginationLinks/PaginationLinks';
import Footer from '@/components/footer/Footer';
import LoadingAnimation from '@/components/loading/LoadingAnimation';
import PageCountCtrl from '@/components/ui/DrinksPage/PageCountCtrl/PageCountCtrl';
// Type interfaces
import { Drink, DrinkInfo, Item } from '@/types/index';

const AllDrinksPage: NextPage = () => {
    const searchParams = useSearchParams()!;
    const pathname = usePathname();
    const router = useRouter();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // React local state
    const [drinksList, setDrinksList] = useState([] as Drink[]);
    const [drinkInfo, setDrinkInfo] = useState([] as DrinkInfo[]);
    const [activePage, setActivePage] = useState(() => {
        return Number(urlParams.get('page'));
    });
    const [numOfPages, setNumOfPages] = useState(0);

    // Redux store state
    const blockedDrinks = useSelector((state: RootState) => state.drinks.blocked);
    const drinksPerPage = useSelector((state: RootState) => state.drinks.drinksPerPage);
    const subCardOpen = useSelector((state: RootState) => state.subCard.open);

    // RTK Queries
    const allDrinks = useGetAllDrinksQuery();
    const [getDrinkInfo, drinkInfoResult] = useLazyGetMultipleDrinkInfoQuery();
    const allIngredients = useGetAllIngredientsQuery();
    const [ingredients, setIngredients] = useState([] as Item[]);

    useEffect(() => {
        if (allIngredients.isSuccess) {
            setIngredients(allIngredients.data);
        }
    }, [allIngredients]);

    useEffect(() => {
        if (allDrinks.isSuccess) {
            const data = allDrinks.data.Drinks as Drink[];

            const filteredData = data.filter((drink: Drink) => {
                if (blockedDrinks.hasOwnProperty(drink.Name.charAt(0))) {
                    if (blockedDrinks[drink.Name.charAt(0)].find((item: DrinkInfo) => drink.Name === item.Name)) {
                        return false;
                    }
                }

                return true;
            });

            setDrinksList(filteredData);
        }
    }, [allDrinks, blockedDrinks]);

    const fetchDrinkInfo = useCallback(() => {
        if (allDrinks.data) {
            const firstDrink = (activePage * drinksPerPage);
            let lastDrink = firstDrink + drinksPerPage;

            if (lastDrink > drinksList.length) {
                lastDrink = drinksList.length;
            }

            const drinkIds: number[] = [];

            for (const drink of drinksList.slice(firstDrink, lastDrink)) {
                drinkIds.push(drink.Id);
            }

            getDrinkInfo(drinkIds);
        }
    }, [activePage, allDrinks, drinksList, drinksPerPage, getDrinkInfo]);

    useEffect(() => {
        if (drinksList.length > 0) {
            fetchDrinkInfo();
            setNumOfPages(Math.ceil(drinksList.length / drinksPerPage));
        }
    }, [drinksList, drinksPerPage, fetchDrinkInfo]);

    useEffect(() => {
        if (drinkInfoResult.data) {
            setDrinkInfo(drinkInfoResult.data);
        }
    }, [drinkInfoResult]);

    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        return params.toString();
    }, [searchParams]);

    useEffect(() => {
        if (drinkInfo.length > 0) {
            fetchDrinkInfo();
            router.push(`${pathname}?` + createQueryString('page', activePage.toString()))
        }
    }, [activePage]);

    return (
        <>
        { (allDrinks.isLoading || 
        drinkInfoResult.isLoading || 
        allIngredients.isLoading) && 
            <main className={['page', styles.DrinksPage].join(' ')}>
                <Head>
                    <title>All Drinks - MakeDrink</title>
                </Head>
                <LoadingAnimation />
                <Footer />
            </main> }
        { allDrinks.isError || 
        drinkInfoResult.isError || 
        allIngredients.isError && 
            <main className={['page', styles.DrinksPage].join(' ')}>
                <Head>
                    <title>All Drinks - MakeDrink</title>
                </Head>
                <h1>Error!</h1>
                <h2>Try again later.</h2>
            </main> }
        { (allDrinks.isSuccess && drinkInfoResult.isSuccess && allIngredients.isSuccess) && 
        !(allDrinks.isLoading || drinkInfoResult.isLoading || allIngredients.isLoading) && 
        !drinkInfo.length && 
            <main className={['page', styles.DrinksPage].join(' ')}>
                <Head>
                    <title>All Drinks - MakeDrink</title>
                </Head>
                <h1>No drinks available!</h1>
                <h2>There seems to be an error - try again later.</h2>
                <Footer />
            </main> }
        { (drinkInfoResult.isSuccess && 
        !(allDrinks.isLoading || drinkInfoResult.isLoading || allIngredients.isLoading) && 
        drinkInfo.length) && 
            <main className={['page', styles.DrinksPage].join(' ')} {...subCardOpen && {style: {height: '100%', overflowY: 'hidden', filter: 'blur(3px)'}}}>
                <Head>
                    <title>All Drinks - MakeDrink</title>
                </Head>
                <PageCountCtrl />
                <PaginationLinks 
                    activePage={activePage} 
                    setActivePage={setActivePage} 
                    numOfPages={numOfPages} 
                    loadState={drinkInfoResult.isLoading} />
                { (drinkInfoResult.isLoading || drinkInfoResult.isFetching) && 
                    <LoadingAnimation /> }
                { !(drinkInfoResult.isLoading || drinkInfoResult.isFetching) && 
                    <section>
                        <ul>
                            { drinkInfo.map((drink: DrinkInfo, index: number) => {
                                return (
                                    <DrinkCard 
                                        key={index} 
                                        drink={drink} 
                                        isRandom={false} 
                                        ingredients={ingredients} />
                                );
                            }) }
                        </ul>
                    </section> }
                <PaginationLinks 
                    activePage={activePage} 
                    setActivePage={setActivePage} 
                    numOfPages={numOfPages} 
                    loadState={drinkInfoResult.isLoading} />
                <PageCountCtrl />
                <Footer />
            </main> }
        </>
    );
}

export default AllDrinksPage;