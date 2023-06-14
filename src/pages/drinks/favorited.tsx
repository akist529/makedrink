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
import { DrinkDict, DrinkInfo } from '@/types/index';

const FavoriteDrinksPage: NextPage = () => {
    const searchParams = useSearchParams()!;
    const pathname = usePathname();
    const router = useRouter();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const favoriteDrinks: DrinkDict = useSelector((state: RootState) => state.drinks.favorites);

    const [drinksList, setDrinksList] = useState([] as DrinkInfo[]);
    const [activePage, setActivePage] = useState(() => {
        return Number(urlParams.get('page'));
    });

    const allDrinks = (() => {
        const arr = [];

        for (const key of Object.keys(favoriteDrinks)) {
            for (const item of favoriteDrinks[key]) {
                arr.push(item);
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
                <h1>No drinks favorited!</h1>
                <h2>Go try some drinks to see what you like.</h2>
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
                            return (<DrinkCard key={index}  drink={drink} isRandom={false} />);
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

export default FavoriteDrinksPage;