// Page styles
import styles from '@/styles/Drinks.module.scss';
// Next components
import type { NextPage } from 'next';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
// React components
import { useState, useEffect, useCallback } from 'react';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetAllIngredientsQuery } from '@/store/api/api';
// Local components
import DrinkCard from '@/components/ui/DrinkCard/DrinkCard';
import PaginationLinks from '@/components/ui/DrinksPage/PaginationLinks/PaginationLinks';
import MakeDrinkLink from '@/components/links/MakeDrinkLink/MakeDrinkLink';
import Footer from '@/components/footer/Footer';
import PageCountCtrl from '@/components/ui/DrinksPage/PageCountCtrl/PageCountCtrl';
// Type interfaces
import { DrinkDict, DrinkInfo, Item } from '@/types/index';

const FavoriteDrinksPage: NextPage = () => {
    const searchParams = useSearchParams()!;
    const pathname = usePathname();
    const router = useRouter();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const favoriteDrinks: DrinkDict = useSelector((state: RootState) => state.drinks.favorites);
    const subCardOpen = useSelector((state: RootState) => state.subCard.open);

    const [drinksList, setDrinksList] = useState([] as DrinkInfo[]);
    const [activePage, setActivePage] = useState(() => {
        return Number(urlParams.get('page'));
    });

    // RTK Queries
    const allIngredients = useGetAllIngredientsQuery();
    const [ingredients, setIngredients] = useState([] as Item[]);    

    useEffect(() => {
        if (allIngredients.isSuccess) {
            setIngredients(allIngredients.data);
        }
    }, [allIngredients]);

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
        <main className={['page', styles.DrinksPage].join(' ')} {...subCardOpen && {style: {height: '100%', overflowY: 'hidden', filter: 'blur(3px)'}}}>
            <Head>
                <title>Favorite Drinks - MakeDrink</title>
            </Head>
            { drinksList.length === 0 && 
                <>
                <h1>No drinks favorited!</h1>
                <h2>Go try some drinks to see what you like.</h2>
                <Link href='/'>
                    <MakeDrinkLink />
                </Link>
                </> }
            { drinksList.length > 0 && 
                <>
                <PageCountCtrl />
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
                                    ingredients={ingredients} />);
                        }) }
                    </ul>
                </section>
                <PaginationLinks 
                    activePage={activePage}
                    setActivePage={setActivePage} 
                    numOfPages={numOfPages} 
                    loadState={false} />
                <PageCountCtrl />
                </> }
            <Footer />
        </main>
    );
}

export default FavoriteDrinksPage;