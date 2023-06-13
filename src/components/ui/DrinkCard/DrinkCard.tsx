// Component styles
import styles from './DrinkCard.module.scss';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setRandomDrink } from '@/store/slices/drinks.slice';
// React components
import React from 'react';
// Next components
import Image from 'next/image';
import Link from 'next/link';
// Type interfaces
import { DrinkInfo, Ingredient, Item } from '@/types/index';
// Local components
import RecipeItem from './RecipeItem/RecipeItem';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getRandomDrink from '@/helpers/getRandomDrink';
import getSlug from '@/helpers/getSlug';
import findItemInStore from '@/helpers/findItemInStore';
import findAltInStore from '@/helpers/findAltInStore';
import findAliasInStore from '@/helpers/findAliasInStore';

export default function DrinkCard (props: { drink: DrinkInfo, isRandom: boolean }) {
    const { drink, isRandom } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const possibleDrinks = useSelector((state: RootState) => state.drinks.possible);
    const randomDrink = useSelector((state: RootState) => state.drinks.random);
    const dispatch = useDispatch();

    function getIngredientFromStore (ingredient: Ingredient, index: number) {
        // Try to find recipe ingredient
        const item = findItemInStore(storedIngredients, ingredient.Name);

        if (item !== undefined) {
            return (
                <RecipeItem 
                    key={index} 
                    ingredient={item} 
                    isSub={false} />
            );
        }

        // Try to find recipe substitute
        const alias = findAliasInStore(storedIngredients, ingredient);

        if (alias !== undefined) {
            const alt = findAltInStore(storedIngredients, alias, ingredient);

            if (alt !== undefined) {
                return (
                    <RecipeItem 
                        key={index}
                        ingredient={alt} 
                        isSub={true} />
                );
            }
        }

        const missingItem = ({
            Id: undefined,
            Name: ingredient.Name,
            AliasId: undefined,
            Type: undefined
        });

        return (
            <RecipeItem 
                key={index} 
                ingredient={missingItem} 
                isSub={false} />
        );
    }

    function handleClick () {
        const drink = getRandomDrink(possibleDrinks, randomDrink);
        
        if (drink) {
            dispatch(setRandomDrink(drink));
        }
    }

    return (
        <article className={styles.DrinkCard}>
            <div className={styles.header}>
                <h2>{drink.Name}</h2>
                { isRandom && 
                    <button onClick={handleClick}>
                        <Image 
                            alt='Get New Drink' 
                            src={require('/public/images/ui/refresh.svg')} 
                            width="0"
                            height="48" 
                            onLoadingComplete={e => updateWidth(e)} />
                    </button> }
            </div>
            <h3>Ingredients</h3>
            <ul className={styles.ingredients}>
                { drink.Recipe.map((ingredient: Ingredient, index: number) => {
                    return getIngredientFromStore(ingredient, index);
                }) }
            </ul>
            <Image 
                alt={drink.Name} 
                src={require('/public/images/ui/cocktail-placeholder.jpg')} 
                width="0" 
                height="128"
                onLoadingComplete={e => updateWidth(e)} />
            <Link href={`/drink/${getSlug(drink.Name)}?page=drinks`}>
                <button className={styles.goBtn}>
                    <span>GO TO DRINK</span>
                    <Image 
                        alt="Go to Drink" 
                        src={require('/public/images/ui/keyboard_double_arrow_right.svg')} 
                        width="0" 
                        height="32" 
                        onLoadingComplete={e => updateWidth(e)} />
                </button>
            </Link>
        </article>
    );
}