// Component styles
import styles from './AddDrinkCard.module.scss';
// Redux components
import { useGetAllIngredientsQuery, useGetAllDrinksQuery } from '@/store/api/api';
// React components
import { useState, useEffect, useMemo, useCallback, useId } from 'react';
// Type interfaces
import { Ingredient, Drink, DrinkInfo } from '@/types/index';
// Local components
import IngredientField from './IngredientField/IngredientField';
import DirectionField from './DirectionField/DirectionField';

export default function AddDrinkCard (props: { drink: DrinkInfo }) {
    const { drink } = props;
    const [recipeCount, setRecipeCount] = useState(Array.from(Array(1).keys()));
    const [directionCount, setDirectionCount] = useState(Array.from(Array(1).keys()));
    const allIngredients = useGetAllIngredientsQuery();
    const allDrinks = useGetAllDrinksQuery();
    const id = useId();

    const ingredients = useMemo(() => {
        if (allIngredients.isSuccess) {
            return allIngredients.data;
        } else return [];
    }, [allIngredients]);

    const drinks = useMemo(() => {
        if (allDrinks.isSuccess) {
            return allDrinks.data.Drinks;
        } else return [];
    }, [allDrinks]);

    useEffect(() => {
        if (drink) {
            if (drink.hasOwnProperty('Recipe')) {
                setRecipeCount(Array.from(Array(drink.Recipe.length).keys()));
            }

            if (drink.hasOwnProperty('Directions')) {
                setDirectionCount(Array.from(Array(drink.Directions.length).keys()));
            }
        }
    }, [drink]);

    const drinkId = useMemo(() => {
        const drinkData = drinks.find((item: Drink) => item.Name === drink.Name);

        if (drinkData) return drinkData.Id;
            else return 0;
    }, [drink, drinks]);

    const removeDirection = useCallback((e: React.MouseEvent<HTMLButtonElement>, i: number) => {
        e.preventDefault();
        
        if (directionCount.length > 1) {
            for (let j = i; j <= directionCount.length; j++) {
                const container = document.getElementById(`dir-${j}-container`) as HTMLDivElement;
                const direction = document.getElementById(`dir-${j}`) as HTMLInputElement;

                container?.id === `dir-${j - 1}-container`;
                direction?.id === `dir-${j - 1}`;

                if (j < recipeCount.length) {
                    direction.value = (document.getElementById(`dir-${j + 1}`) as HTMLInputElement)?.value;
                }
            }

            setDirectionCount((prev: number[]) => prev.slice(0, (prev.length - 1)));
        }
    }, [directionCount.length, recipeCount.length]);

    const addIngredient = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setRecipeCount((prev: number[]) => [...prev, (prev.length)]);
    }, []);

    const addDirection = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDirectionCount((prev: number[]) => [...prev, (prev.length)]);
    }, []);

    const removeIngredient = useCallback((e: React.MouseEvent<HTMLButtonElement>, i: number) => {
        e.preventDefault();
        
        if (recipeCount.length > 1) {
            for (let j = i; j <= recipeCount.length; j++) {
                const container = document.getElementById(`item-${j}-container`) as HTMLDivElement;
                const name = document.getElementById(`item-${j}-name`) as HTMLSelectElement;
                const amount = document.getElementById(`item-${j}-amount`) as HTMLInputElement;
                const unit = document.getElementById(`item-${j}-unit`) as HTMLSpanElement;

                container?.id === `item-${j - 1}-container`;
                name?.id === `item-${j - 1}-name`;
                amount?.id === `item-${j - 1}-amount`;
                unit?.id === `item-${j - 1}-unit`;

                if (j < recipeCount.length) {
                    name.value = (document.getElementById(`item-${j + 1}-name`) as HTMLSelectElement)?.value;
                    amount.value = (document.getElementById(`item-${j + 1}-amount`) as HTMLInputElement)?.value;
                    unit.innerHTML = (document.getElementById(`item-${j + 1}-unit`) as HTMLSpanElement)?.innerHTML;
                }
            }

            setRecipeCount((prev: number[]) => prev.slice(0, (prev.length - 1)));
        }
    }, [recipeCount.length]);

    const getIngredient = useCallback((i: number) => {
        if (drink && drink.hasOwnProperty('Recipe')) {
            return drink.Recipe[i];
        } else {
            return {} as Ingredient;
        }
    }, [drink]);

    const getDirection = useCallback((i: number) => {
        if (drink && drink.hasOwnProperty('Directions')) {
            return drink.Directions[i];
        } else {
            return "";
        }
    }, [drink]);

    return (
        <div data-testid='add-drink-card' className={styles.AddDrinkCard}>
            <header>
                <strong>Add New Drink</strong>
            </header>
            <form action="https://api.makedr.ink/drink" method="post">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder={drink?.Name || "Name"}/><br/>
                <input id="id" name="id" type="hidden" value={drinkId}/>
                <label htmlFor="recipe-credit">Recipe Credit:</label>
                <input type="text" id="recipe-credit" name="recipe-credit" placeholder="Add Credit (Optional)"/><br/>
                <><fieldset>
                    <legend>Recipe</legend>
                    <ul>
                    { recipeCount.map((i: number) => {
                        return (
                            <IngredientField 
                                key={i} 
                                i={i} 
                                ingredients={ingredients} 
                                removeIngredient={removeIngredient} 
                                value={getIngredient(i)} />
                        );
                    }) }
                    </ul>
                    <button onClick={addIngredient}>
                        <span>Add Ingredient</span>
                    </button>
                </fieldset><br/></>
                <><fieldset>
                    <legend>Directions</legend>
                    <ul>
                    { directionCount.map((i: number) => {
                        return (
                            <DirectionField 
                                key={i} 
                                i={i} 
                                removeDirection={removeDirection} 
                                value={getDirection(i)} />
                        );
                    }) }
                    </ul>
                    <button onClick={addDirection}>
                        <span>Add Direction</span>
                    </button>
                </fieldset><br/></>
                <fieldset>
                    <legend>Image</legend>
                    <input id={`${id}-image`} type="file" name="image" accept=".webp"/><br/>
                    <label htmlFor={`${id}-img-credit`}>Image Credit:</label>
                    <input 
                        type="text" 
                        id={`${id}-img-credit`} 
                        name="img-credit" 
                        placeholder="Add Image Credit (Optional)"/><br/>
                </fieldset>
                <input 
                    type="submit" 
                    value="Submit" 
                    className={styles.submit} />
            </form>
        </div>
    );
}
