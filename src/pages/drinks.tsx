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
// Type interfaces
import { DrinkDict, DrinkInfo } from '@/types/index';

const DrinksPage: NextPage = () => {
    const possibleDrinks: DrinkDict = useSelector((state: RootState) => state.drinks.possible);
    const [firstDrink, setFirstDrink] = useState(0);
    const [lastDrink, setLastDrink] = useState(20);

    const drinksList = (() => {
        const arr = [];

        for (const key of Object.keys(possibleDrinks)) {
            for (const item of possibleDrinks[key]) {
                arr.push(item);
            }
        }

        return arr;
    })();

    function changePage (pages: string) {
        const firstNum = Number(pages.replaceAll(' ', '').split('-')[0]);
        const secondNum = Number(pages.replaceAll(' ', '').split('-')[1]);

        setFirstDrink(firstNum);
        setLastDrink(secondNum);
    }

    return (
        <main className={styles.DrinksPage}>
            <nav>
                <ul>
                    { (() => {
                        const pageNums = [];

                        for (let i = 1; i < drinksList.length; i++) {
                            const firstNum = i;
                            const secondNum = ((i + 20) > drinksList.length) ? drinksList.length : (i + 20);
                            pageNums.push(`${firstNum} - ${secondNum}`);
                            i += 20;
                        }

                        return pageNums;
                    })().map((pages: string, index: number) => {
                        return (
                            <li key={index}>
                                <button className={styles.pageBtn} onClick={() => changePage(pages)}>
                                    <span>{pages}</span>
                                </button>
                            </li>
                        );
                    }) }
                </ul>
            </nav>
            <section>
                <ul>
                    { drinksList.slice(firstDrink, lastDrink).map((drink: DrinkInfo, index: number) => {
                        return <DrinkCard drink={drink} key={index} />
                    }) }
                </ul>
            </section>
        </main>
    );
}

export default DrinksPage;