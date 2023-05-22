// Page styles
import styles from '@/styles/Ingredients.module.scss'
// Next components
import Image from 'next/image';
import type { NextPage } from 'next';
// Redux components
import { useSelector, useDispatch } from 'react-redux'
import { useGetAllIngredientsQuery, useLazyGetMultipleDrinkInfoQuery } from '@/store/api/api'
import { RootState } from '@/store/store'
import { addPossibleDrink } from '@/store/slices/drinks.slice'
// Type interfaces
import { Item, Drink } from '@/types/index'
// Local components
import IngredientCatBtn from '@/components/buttons/IngredientCatBtn/IngredientCatBtn'
import IngredientSection from '@/components/ui/IngredientsPage/IngredientSection/IngredientSection'
import { useEffect } from 'react'

const IngredientsPage: NextPage = () => {
    const allIngredients = useGetAllIngredientsQuery();
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const dispatch = useDispatch();
    const [getDrinkInfo, result] = useLazyGetMultipleDrinkInfoQuery();

    const ingredientsImagePath = require('/public/images/ui/local_bar.svg')
    const alcoholImagePath = require('/public/images/ui/drunk.webp')
    const mixerImagePath = require('/public/images/ui/shaker.webp')

    function filterData (type: string[]) {
        let filteredData: Item[] = []

        for (let i = 0; i < type.length; i++) {
            const categoryData = (allIngredients.data as Item[]).filter(ingredient => {
                return ingredient['Type'] === type[i]
            })

            for (const item of categoryData) {
                filteredData.push(item)
            }
        }

        return filteredData
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
    }, [result])

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
            { allIngredients.data && <div className={styles.IngredientsPage}>
                <h1>
                    <div>
                        {'Select'.split('').map((letter, index) => {
                            return (
                                <span key={index}>{letter}</span>
                            )
                        })}
                    </div>
                    <div>
                        {'Ingredients'.split('').map((letter, index) => {
                            return (
                                <span key={index}>{letter}</span>
                            )
                        })}
                    </div>
                    <Image alt='Select Ingredients' src={ingredientsImagePath} width='64' height='64' />
                </h1>
                <div>
                    <div className={styles.category}>
                        <h2>Alcohol</h2>
                        <Image alt="Alcohol" src={alcoholImagePath} width="64" />
                    </div>
                    <IngredientCatBtn category="Spirits" color="pink" />
                    <IngredientSection section={filterData(['liquor'])} />
                    <IngredientCatBtn category="Liqueurs" color="green" />
                    <IngredientSection section={filterData(['liqueur'])} />
                    <IngredientCatBtn category="Other" color="red" />
                    <IngredientSection section={filterData(['other', 'wine'])} />
                </div>
                <div>
                    <div className={styles.category}>
                        <h2>Mixers</h2>
                        <Image alt="Mixers" src={mixerImagePath} height="64" />
                    </div>
                    <IngredientCatBtn category="Carbonated" color="yellow" />
                    <IngredientSection section={filterData(['carbonated'])} />
                    <IngredientCatBtn category="Juices" color="orange" />
                    <IngredientSection section={filterData(['juice'])} />
                    <IngredientCatBtn category="Other" color="blue" />
                    <IngredientSection section={filterData(['mixer'])} />
                </div>
            </div> }
            { allIngredients.isLoading &&
                <h1>Loading...</h1> }
            { allIngredients.error &&
                <h1>Error!</h1> }
        </>
    );
}

export default IngredientsPage;