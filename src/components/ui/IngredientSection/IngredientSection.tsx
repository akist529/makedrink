// Component styles
import styles from './IngredientSection.module.scss'
// Local components
import Ingredient from '@/components/ui/Ingredient/Ingredient'
// Type interfaces
import { Item, DrinkInfo, Drink } from '@/types/index'
// Redux components
import { useSelector, useDispatch } from 'react-redux'
import { useGetAllDrinkInfoQuery } from '@/store/api/api'
import { RootState } from '@/store/store'
import { addPossibleDrink } from '@/store/slices/drinks.slice'
import { useEffect } from 'react'
import { resolveSoa } from 'dns'

export default function IngredientSection (props: {section: Item[]}) {
    const {section} = props
    const allDrinkInfo = (useGetAllDrinkInfoQuery().data || []);
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const possibleDrinks = useSelector((state: RootState) => state.drinks.possible);
    const dispatch = useDispatch();


    // Remove ingredients that are variants of another ingredient
    const filteredSection = (() => {
        return section.filter(item => item['AliasId'] === 0)
    })()


    // Sort ingredients alphabetically before rendering to DOM
    const sortedSection = (() => {
        const sorted = filteredSection.sort(function (a: Item, b: Item) {
            if (a['Name'] < b['Name']) {
                return -1
            } else {
                return 1
            }
        })
        
        return sorted
    })()

    useEffect(() => {
        const ingredientIds: number[] = [];

        for (const type of Object.keys(storedIngredients)) {
            for (const key of Object.keys(storedIngredients[type])) {
                for (let i = 0; i < storedIngredients[type][key].length; i++) {
                    ingredientIds.push(storedIngredients[type][key][i].Id);
                }
            }
        }

        const fetchDrinks = async () => {
            await fetch('http://15.204.244.7:8585/drinks', {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ingredientIds.join())
            }).then(res => {
                if (res.ok) {
                    console.log(res.json());
                }
            }).catch(err => {
                console.log(err);
            });
        }

        fetchDrinks();

        // // Find possible drink recipes based on new ingredient
        // const onlyNewDrinks: DrinkInfo[] = (allDrinkInfo || []).filter(drink => {
        //     for (let i = 0; i < possibleDrinks.length; i++) {
        //         if (possibleDrinks[i].Name === drink.Name) {
        //             return false;
        //         }
        //     }
            
        //     return true;
        // })

        // const drinksToAdd: DrinkInfo[] = []

        // for (let i = 0; i < onlyNewDrinks.length; i++) {
        //     const haveIngredients = onlyNewDrinks[i].Recipe.every(ingredient => {
        //         let letter;

        //         if (ingredient.IsAlias) {
        //             letter = ingredient.Alias.charAt(0);
        //         } else {
        //             letter = ingredient.Name.charAt(0);
        //         }

        //         for (const type of Object.keys(storedIngredients)) {
        //             if (storedIngredients[`${type}`].hasOwnProperty(letter)) {
        //                 for (const item of storedIngredients[`${type}`][`${letter}`]) {
        //                     if ((item.Name === ingredient.Name) || (item.Name === ingredient.Alias)) {
        //                         return true
        //                     }
        //                 }
        //             }
        //         }

        //         return false
        //     })

        //     if (haveIngredients) {
        //         drinksToAdd.push(onlyNewDrinks[i])
        //     }
        // }

        // for (let i = 0; i < drinksToAdd.length; i++) {
        //     dispatch(addPossibleDrink(drinksToAdd[i]));
        // }
    }, [storedIngredients, dispatch])


    return (
        <ul className={styles.IngredientSection}>
            {sortedSection.map((item: Item) => {
                return (
                    <Ingredient
                        key={item['Id']}
                        item={item}
                        section={section}
                    />
                )
            })}
        </ul>
    )
}