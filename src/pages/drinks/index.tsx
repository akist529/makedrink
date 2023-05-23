// Page styles
import styles from '@/styles/Drinks.module.scss';
// Next components
import type { NextPage } from 'next';
// React components
import { useState, useEffect } from 'react';
// Redux components
import { useGetAllDrinkInfoQuery } from '@/store/api/api';
// Local components
import DrinkCard from '@/components/ui/DrinksPage/DrinkCard/DrinkCard';
import PaginationLinks from '@/components/ui/DrinksPage/PaginationLinks/PaginationLinks';
// Type interfaces
import { DrinkInfo } from '@/types/index';

const AllDrinksPage: NextPage = () => {
    const { data, isLoading } = useGetAllDrinkInfoQuery();
    const [firstDrink, setFirstDrink] = useState(0);
    const [lastDrink, setLastDrink] = useState(20);
    const [pageNums, setPageNums] = useState([] as string[]);

    useEffect(() => {
        if (!isLoading) {
            const pageNumsArr = (() => {
                const arr = [];
        
                for (let i = 0; i < (data || []).length; i++) {
                    const firstNum = i;
                    const secondNum = ((i + 20) > (data || []).length) ? (data || []).length : (i + 20);
                    arr.push(`${firstNum + 1} - ${secondNum + 1}`);
                    i += 20;
                }
        
                return arr;
            })();

            setPageNums(pageNumsArr);
        }
    }, [isLoading]);

    return (
        <>
        { isLoading && 
            <main className={styles.DrinksPage}>
                <h1>Loading...</h1>
            </main> }
        { !isLoading && !(data || []).length && 
            <main className={styles.DrinksPage}>
                <h1>No drinks available!</h1>
            </main> }
        { !isLoading && (data || []).length && 
            <main className={styles.DrinksPage}>
                <PaginationLinks 
                    pageNums={pageNums} 
                    setFirstDrink={setFirstDrink} 
                    setLastDrink={setLastDrink} />
                <section>
                    <ul>
                        { (data || []).slice(firstDrink, lastDrink).map((drink: DrinkInfo, index: number) => {
                            return (<DrinkCard drink={drink} key={index} />);
                        }) }
                    </ul>
                </section>
                <PaginationLinks 
                    pageNums={pageNums} 
                    setFirstDrink={setFirstDrink} 
                    setLastDrink={setLastDrink} />
            </main> }
        </>
    );
}

export default AllDrinksPage;