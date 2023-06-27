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
import { useGetAllIngredientsQuery } from '@/store/api/api';
// Local components
import DrinkCard from '@/components/ui/DrinkCard/DrinkCard';
import PaginationLinks from '@/components/ui/DrinksPage/PaginationLinks/PaginationLinks';
import SelectIngredientsLink from '@/components/links/SelectIngredientsLink/SelectIngredientsLink';
import Footer from '@/components/footer/Footer';
import PageCountCtrl from '@/components/ui/DrinksPage/PageCountCtrl/PageCountCtrl';
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

    // Redux store state
    const possibleDrinks: DrinkDict = useSelector((state: RootState) => state.drinks.possible);
    const blockedDrinks: DrinkDict = useSelector((state: RootState) => state.drinks.blocked);

    const allDrinks: DrinkInfo[] = (() => {
        const arr = [];

        for (const key of Object.keys(possibleDrinks)) {
            for (const item of possibleDrinks[key]) {
                if (blockedDrinks.hasOwnProperty(item.Name.charAt(0))) {
                    if (blockedDrinks[item.Name.charAt(0)].find((drink: DrinkInfo) => drink.Name === item.Name)) {
                        continue;
                    }
                }
                
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
            <main className={['page', styles.DrinksPage].join(' ')}>
                <Head>
                    <title>Possible Drinks - MakeDrink</title>
                </Head>
                <h1>No drinks possible!</h1>
                <h2>Add some ingredients to your store.</h2>
                <SelectIngredientsLink />
                <Footer />
            </main> }
        { (drinksList.length > 0) && 
            <main className={['page', styles.DrinksPage].join(' ')}>
                <Head>
                    <title>Possible Drinks - MakeDrink</title>
                </Head>
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
                <PageCountCtrl />
                <Footer />
            </main> }
        </>
    );
}

export default PossibleDrinksPage;