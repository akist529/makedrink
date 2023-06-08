// Page styles
import styles from '@/styles/Drinks.module.scss';
// Next components
import type { NextPage } from 'next';
import Link from 'next/link';
// React components
import { useState } from 'react';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Local components
import DrinkCard from '@/components/ui/DrinksPage/DrinkCard/DrinkCard';
import PaginationLinks from '@/components/ui/DrinksPage/PaginationLinks/PaginationLinks';
import MakeDrinkButton from '@/components/buttons/MakeDrinkButton/MakeDrinkButton';
// Type interfaces
import { DrinkDict, DrinkInfo } from '@/types/index';

const BlockedDrinksPage: NextPage = () => {
    const blockedDrinks: DrinkDict = useSelector((state: RootState) => state.drinks.blocked);
    const [firstDrink, setFirstDrink] = useState(0);
    const [lastDrink, setLastDrink] = useState(20);
    const [activePage, setActivePage] = useState(0);

    const drinksList = (() => {
        const arr = [];

        for (const key of Object.keys(blockedDrinks)) {
            for (const item of blockedDrinks[key]) {
                arr.push(item);
            }
        }

        return arr;
    })();

    const pageNums = (() => {
        const arr = [];

        for (let i = 0; i < drinksList.length; i++) {
            const firstNum = i;
            const secondNum = ((i + 20) > drinksList.length) ? drinksList.length : (i + 20);
            arr.push(`${firstNum + 1} - ${secondNum + 1}`);
            i += 20;
        }

        return arr;
    })();

    return (
        <>
        { (drinksList.length === 0) && 
            <main className={styles.DrinksPage}>
                <h1>No drinks blocked!</h1>
                <h2>Go try some drinks to see what you like.</h2>
                <Link href='/'>
                    <nav>
                        <MakeDrinkButton />
                    </nav>
                </Link>
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

export default BlockedDrinksPage;