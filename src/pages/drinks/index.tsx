// Page styles
import styles from '@/styles/Drinks.module.scss';
// Next components
import type { NextPage } from 'next';
// React components
import { useState, useEffect } from 'react';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetAllDrinkInfoQuery } from '@/store/api/api';
// Local components
import DrinkCard from '@/components/ui/DrinksPage/DrinkCard/DrinkCard';
import PaginationLinks from '@/components/ui/DrinksPage/PaginationLinks/PaginationLinks';
import Footer from '@/components/footer/Footer';
// Type interfaces
import { DrinkInfo } from '@/types/index';

const AllDrinksPage: NextPage = () => {
    // React local state
    const [firstDrink, setFirstDrink] = useState(0);
    const [lastDrink, setLastDrink] = useState(20);
    const [pageNums, setPageNums] = useState([] as string[]);
    const [drinksList, setDrinksList] = useState([] as DrinkInfo[]);
    const [activePage, setActivePage] = useState(0);

    // Redux store state
    const blockedDrinks = useSelector((state: RootState) => state.drinks.blocked);

    // RTK Queries
    const { data, isLoading, isSuccess } = useGetAllDrinkInfoQuery();

    useEffect(() => {
        if (isSuccess) {
            const allDrinks = data || [];
            const arr = allDrinks.filter((drink: DrinkInfo) => {
                if (blockedDrinks.hasOwnProperty(drink.Name.charAt(0))) {
                    if (blockedDrinks[drink.Name.charAt(0)].find((item: DrinkInfo) => drink.Name === item.Name)) {
                        return false;
                    }
                }

                return true;
            });

            const pageNumsArr = (() => {
                const arr = [];
        
                for (let i = 0; i < allDrinks.length; i++) {
                    const firstNum = i;
                    const secondNum = ((i + 20) > allDrinks.length) ? allDrinks.length : (i + 20);
                    arr.push(`${firstNum + 1} - ${secondNum + 1}`);
                    i += 20;
                }
        
                return arr;
            })();

            setPageNums(pageNumsArr);
            setDrinksList(arr);
        }
    }, [isLoading]);

    useEffect(() => {
        setFirstDrink(activePage * 20);
        setLastDrink(() => {
            if ((firstDrink + 20) > drinksList.length) {
                return drinksList.length;
            } else {
                return (firstDrink + 20);
            }
        });
    }, [activePage]);

    return (
        <>
        { isLoading && 
            <main className={styles.DrinksPage}>
                <h1>Loading...</h1>
                <Footer />
            </main> }
        { !isLoading && !(data || []).length && 
            <main className={styles.DrinksPage}>
                <h1>No drinks available!</h1>
                <h2>There seems to be an error - try again later.</h2>
                <Footer />
            </main> }
        { !isLoading && (data || []).length && 
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
                            return (
                                <DrinkCard drink={drink} key={index} />
                            );
                        }) }
                    </ul>
                </section>
                <PaginationLinks 
                    pageNums={pageNums} 
                    setFirstDrink={setFirstDrink} 
                    setLastDrink={setLastDrink} 
                    activePage={activePage} 
                    setActivePage={setActivePage} />
                <Footer />
            </main> }
        </>
    );
}

export default AllDrinksPage;