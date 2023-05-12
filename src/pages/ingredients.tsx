// Page styles
import styles from '@/styles/Ingredients.module.scss'
// Next components
import Image from 'next/image'
// Redux components
import { useSelector, useDispatch } from 'react-redux'
import { useGetAllIngredientsQuery } from '@/store/api/api'
import { RootState } from '@/store/store'
// Type interfaces
import { Item } from '@/types/index'
// Local components
import IngredientCatBtn from '@/components/buttons/IngredientCatBtn/IngredientCatBtn'
import IngredientSection from '@/components/ui/IngredientSection/IngredientSection'
import { useEffect } from 'react'

export default function IngredientsPage() {
    const { data, isLoading, error } = useGetAllIngredientsQuery()
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const dispatch = useDispatch();

    const ingredientsImagePath = require('/public/images/ui/local_bar.svg')
    const alcoholImagePath = require('/public/images/ui/drunk.webp')
    const mixerImagePath = require('/public/images/ui/shaker.webp')

    function filterData (type: string[]) {
        let filteredData: Item[] = []

        for (let i = 0; i < type.length; i++) {
            const categoryData = (data as Item[]).filter(ingredient => {
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

        const fetchDrinks = () => {
            var urlencoded = new URLSearchParams();
            urlencoded.append('ingredients', ingredientIds.join());

            fetch('http://15.204.244.7:8585/drinks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlencoded,
                redirect: 'follow'
            }).then(res => {
                if (res.ok) {
                    console.log(res.text());
                }
            }).catch(err => {
                console.log(err);
            });
        }

        fetchDrinks();
    }, [storedIngredients, dispatch]);

    return (
        <>
            { data && <div className={styles.IngredientsPage}>
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
            { isLoading &&
                <h1>Loading...</h1> }
            { error &&
                <h1>Error!</h1> }
        </>
    )
}