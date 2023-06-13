// Page styles
import styles from '@/styles/Ingredients.module.scss';
// Next components
import Image from 'next/image';
import type { NextPage } from 'next';
// React components
import { useEffect } from 'react';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { useGetAllIngredientsQuery, useLazyGetMultipleDrinkInfoQuery } from '@/store/api/api';
import { RootState } from '@/store/store';
import { addPossibleDrink } from '@/store/slices/drinks.slice';
// Type interfaces
import { Item, Drink } from '@/types/index';
// Local components
import IngredientCategoryButton from '@/components/buttons/IngredientCategoryButton/IngredientCategoryButton';
import IngredientSection from '@/components/ui/IngredientsPage/IngredientsSection/IngredientList/IngredientList';
import Footer from '@/components/footer/Footer';
import IngredientsTitle from '@/components/ui/IngredientsPage/IngredientsTitle/IngredientsTitle';
import IngredientsSection from '@/components/ui/IngredientsPage/IngredientsSection/IngredientsSection';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

const IngredientsPage: NextPage = () => {
    const allIngredients = useGetAllIngredientsQuery();
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const dispatch = useDispatch();
    const [getDrinkInfo, result] = useLazyGetMultipleDrinkInfoQuery();

    const alcoholImagePath = require('/public/images/ui/drunk.webp');
    const mixerImagePath = require('/public/images/ui/shaker.webp');

    function filterDataByType (type: string[]) {
        let filteredData: Item[] = [];

        for (let i = 0; i < type.length; i++) {
            const categoryData = (allIngredients.data as Item[]).filter(ingredient => {
                return ingredient.Type === type[i];
            });

            for (const item of categoryData) {
                filteredData.push(item);
            }
        }

        return filteredData;
    }

    useEffect(() => {
        const ingredientIds: number[] = [];

        for (const type of Object.keys(storedIngredients)) {
            for (const key of Object.keys(storedIngredients[type])) {
                for (let i = 0; i < storedIngredients[type][key].length; i++) {
                    ingredientIds.push(storedIngredients[type][key][i].Id);
                }
            }
        }

        if (ingredientIds.length) {
            getDrinks(ingredientIds.join());
        }
    }, [storedIngredients, dispatch]);

    useEffect(() => {
        if (result && result.data) {
            for (const drink of result.data) {
                dispatch(addPossibleDrink(drink));
            }
        }
    }, [result]);

    function getDrinks (ids: string) {
        var urlencoded = new URLSearchParams();
        urlencoded.append('ingredients', ids);

        fetch('http://15.204.244.7:8585/drinks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlencoded,
            redirect: 'follow'
        }).then(res => {
            return res.json();
        }).then(data => {
            const ids: number[] = [];

            data.Drinks.forEach((drink: Drink) => {
                ids.push(drink.Id);
            })

            getDrinkInfo(ids);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            { allIngredients.data && 
                <main className={styles.IngredientsPage}>
                    <IngredientsTitle />
                    <IngredientsSection 
                        section='Alcohol' 
                        ingredients={(allIngredients.data as Item[])} />
                    <IngredientsSection 
                        section='Mixers' 
                        ingredients={(allIngredients.data as Item[])} />
                    <Footer />
                </main> }
            { allIngredients.isLoading &&
                <main className={styles.IngredientsPage}>
                    <h1>Loading...</h1>
                </main> }
            { allIngredients.isError &&
                <main className={styles.IngredientsPage}>
                    <h1>Error!</h1>
                </main> }
        </>
    );
}

export default IngredientsPage;