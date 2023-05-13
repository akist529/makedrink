import styles from '@/styles/Drink.module.scss'
import { useGetAllDrinksQuery, useLazyGetDrinkInfoQuery } from '@/store/api/api'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { DrinkInfo, Ingredient, Item } from '@/types/index';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import RecipeItem from '@/components/ui/RecipeItem/RecipeItem';

export default function DrinkPage () {
    const allDrinks = useGetAllDrinksQuery().data || [];
    const [getDrinkInfo, result] = useLazyGetDrinkInfoQuery();
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const router = useRouter();
    const [drinkError, setDrinkError] = useState(false);
    const [recipeError, setRecipeError] = useState(false);
    const [drinkInfo, setDrinkInfo] = useState({} as DrinkInfo);

    useEffect(() => {
        if (router.isReady) {
            const displayName = getDrinkName();
            fetchDrinkInfo(displayName);
        }
    }, [router.isReady]);

    useEffect(() => {
        if (result && result.data) {
            setDrinkInfo(result.data);
        }
    }, [result]);

    function getDrinkName () {
        let urlName;

        if (router.query.name) {
            urlName = router.query.name.toString().split('-');

            for (let i = 0; i < urlName.length; i++) {
                urlName[i] = urlName[i][0].toUpperCase() + urlName[i].slice(1);
            }

            return urlName.toString().replaceAll(',', ' ');
        } else {
            return '';
        }
    }

    function fetchDrinkInfo(displayName: string) {
        for (const drink of allDrinks.Drinks) {
            if (drink.Name === displayName) {
                getDrinkInfo(drink.Id);
            }
        }
    }

    function getIngredient (ingredient: Ingredient, index: number) {
        const letter = ingredient.Name.charAt(0);

        for (const type of Object.keys(storedIngredients)) {
            if (storedIngredients[type].hasOwnProperty(letter)) {
                for (const item of storedIngredients[type][letter]) {
                    if (item.Name === ingredient.Name) {
                        return (
                            <RecipeItem key={index} ingredient={ingredient} missing={false} />
                        );
                    }
                }
            }
        }

        return getIngredientAlias(ingredient, index);
    }

    function getIngredientAlias (ingredient: Ingredient, index: number) {
        const letter = ingredient.Alias.charAt(0);

        for (const type of Object.keys(storedIngredients)) {
            if (storedIngredients[type].hasOwnProperty(letter)) {
                for (const item of storedIngredients[type][letter]) {
                    if (item.Name === ingredient.Alias) {
                        return getAltIngredient(item, index);
                    }
                }
            }
        }

        if (!recipeError) {
            setRecipeError(true);
        }
        
        return <RecipeItem key={index} ingredient={ingredient} missing={true} />
    }

    function getAltIngredient (ingredient: Item, index: number) {
        for (const key of Object.keys(storedIngredients[ingredient.Type])) {
            for (let i = 0; i < storedIngredients[ingredient.Type][key].length; i++) {
                if (storedIngredients[ingredient.Type][key][i].AliasId === ingredient.Id) {
                    return <RecipeItem key={index} ingredient={ingredient} missing={false} />
                }
            }
        }

        if (!recipeError) {
            setRecipeError(true);
        }

        return <RecipeItem key={index} ingredient={ingredient} missing={true} />
    }

    return (
        <div className={styles.Drink}>
            { !drinkError && !drinkInfo.Name && <h1>Waiting...</h1> }
            { drinkError && <h1>The drink you entered does not exist!</h1> }
            { drinkInfo.Name && 
            <div>
                { recipeError && <strong>You are missing ingredients for this recipe!</strong> }
                <h1>{drinkInfo.Name}</h1>
                <h2>Recipe</h2>
                <h3>Ingredients</h3>
                <ul>
                    { drinkInfo.Recipe.map((ingredient, index) => {
                        return getIngredient(ingredient, index)
                    }) }
                </ul>
                <ul>
                    { drinkInfo.Directions.map((direction, index) => {
                        return <li key={index}>{direction}</li>
                    }) }
                </ul>
            </div> }
        </div>
    );
}