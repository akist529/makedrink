// Page styles
import styles from '@/styles/Drinks.module.scss';
// Next components
import type { NextPage } from 'next';
// React components
import { useState, useEffect } from 'react';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetAllDrinksQuery, useLazyGetMultipleDrinkInfoQuery } from '@/store/api/api';
// Local components
import DrinkCard from '@/components/ui/DrinkCard/DrinkCard';
import PaginationLinks from '@/components/ui/DrinksPage/PaginationLinks/PaginationLinks';
import Footer from '@/components/footer/Footer';
import LoadingAnimation from '@/components/loading/LoadingAnimation';
// Type interfaces
import { Drink, DrinkInfo } from '@/types/index';

const AllDrinksPage: NextPage = () => {
    // React local state
    const [drinksList, setDrinksList] = useState([] as Drink[]);
    const [drinkInfo, setDrinkInfo] = useState([] as DrinkInfo[]);
    const [activePage, setActivePage] = useState(0);
    const [numOfPages, setNumOfPages] = useState(0);

    // Redux store state
    const blockedDrinks = useSelector((state: RootState) => state.drinks.blocked);

    // RTK Queries
    const allDrinks = useGetAllDrinksQuery();
    const [getDrinkInfo, drinkInfoResult] = useLazyGetMultipleDrinkInfoQuery();

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
    }, [allDrinks.isLoading]);

    useEffect(() => {
        if (drinksList.length > 0) {
            fetchDrinkInfo();
            setNumOfPages(Math.ceil(drinksList.length / 20));
        }
    }, [drinksList]);

    function fetchDrinkInfo () {
        if (allDrinks.data) {
            const firstDrink = (activePage * 20);
            let lastDrink = firstDrink + 20;

            if (lastDrink > drinksList.length) {
                lastDrink = drinksList.length;
            }

            const drinkIds: number[] = [];

            for (const drink of drinksList.slice(firstDrink, lastDrink)) {
                drinkIds.push(drink.Id);
            }

            getDrinkInfo(drinkIds);
        }
    }

    useEffect(() => {
        if (drinkInfoResult.data) {
            setDrinkInfo(drinkInfoResult.data);
        }
    }, [drinkInfoResult]);

    useEffect(() => {
        if (drinkInfo.length > 0) {
            fetchDrinkInfo();
        }
    }, [activePage]);

    return (
        <>
        { (allDrinks.isLoading || 
        drinkInfoResult.isLoading) && 
            <main className={styles.DrinksPage}>
                <LoadingAnimation />
                <Footer />
            </main> }
        { (allDrinks.isError || 
        drinkInfoResult.isError) && 
            <main className={styles.DrinksPage}>
                <h1>Error!</h1>
                <h2>Try again later.</h2>
            </main> }
        { (allDrinks.isSuccess && drinkInfoResult.isSuccess) && 
        !(allDrinks.isLoading || drinkInfoResult.isLoading) && 
        !drinkInfo.length && 
            <main className={styles.DrinksPage}>
                <h1>No drinks available!</h1>
                <h2>There seems to be an error - try again later.</h2>
                <Footer />
            </main> }
        { (drinkInfoResult.isSuccess && 
        !(allDrinks.isLoading || drinkInfoResult.isLoading) && 
        drinkInfo.length) && 
            <main className={styles.DrinksPage}>
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
                                    <DrinkCard drink={drink} key={index} />
                                );
                            }) }
                        </ul>
                    </section> }
                <PaginationLinks 
                    activePage={activePage} 
                    setActivePage={setActivePage} 
                    numOfPages={numOfPages} 
                    loadState={drinkInfoResult.isLoading} />
                <Footer />
            </main> }
        </>
    );
}

export default AllDrinksPage;