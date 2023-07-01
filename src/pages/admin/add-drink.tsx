// Next components
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSearchParams, usePathname } from 'next/navigation';
// Local components
import AddDrinkCard from '@/components/ui/AddDrinkPage/AddDrinkCard/AddDrinkCard';
import Footer from '@/components/footer/Footer';
// React components
import { useEffect, useState, useMemo, useCallback } from 'react';
// Redux components
import { useGetAllDrinksQuery, useLazyGetDrinkInfoQuery } from '@/store/api/api';
// Type interfaces
import { DrinkInfo } from '@/types/index';

const AddDrinkPage: NextPage = () => {
    const router = useRouter();

    // Memoized veriables
    const queryString = useMemo(() => {
        return window.location.search;
    }, []);
    const urlParams = useMemo(() => {
        return new URLSearchParams(queryString);
    }, [queryString]);

    // RTK Queries
    const allDrinks = useGetAllDrinksQuery();
    const [getDrinkInfo, drinkInfoResult] = useLazyGetDrinkInfoQuery();
    
    // React states
    const [drinkName, setDrinkName] = useState('');
    const [drinkInfo, setDrinkInfo] = useState({} as DrinkInfo);

    const getDrinkName = useCallback(() => {
        const name = urlParams.get('drink');

        if (name) setDrinkName(name);
    }, [urlParams]);

    const fetchDrinkInfo = useCallback(() => {
        if (allDrinks.isSuccess && drinkName) {
            for (const drink of allDrinks.data.Drinks) {
                if (drink.Name.toLowerCase().replaceAll('ä', 'a').replaceAll(' ', '-').replaceAll('/', '-') === drinkName.toLowerCase()) {
                    getDrinkInfo(drink.Id);
                }
            }
        }
    }, [allDrinks, getDrinkInfo, drinkName]);

    useEffect(() => {
        if (router.isReady && allDrinks.isSuccess && drinkName) {
            fetchDrinkInfo();
        }
    }, [router, allDrinks, fetchDrinkInfo, drinkName]);

    useEffect(() => {
        if (drinkInfoResult && drinkInfoResult.data) {
            setDrinkInfo(drinkInfoResult.data);
        }
    }, [drinkInfoResult, drinkInfo]);

    useEffect(() => {
        getDrinkName();
    }, [urlParams, getDrinkName]);

    return (
        <div className='page'>
            <Head>
                <title>Add New Drink - MakeDrink</title>
            </Head>
            <AddDrinkCard drink={drinkInfo} />
            <Footer />
        </div>
    );
}

export default AddDrinkPage;