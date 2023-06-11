// Page styles
import styles from './DrinkCard.module.scss';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// React components
import React, { SyntheticEvent, useState } from 'react';
// Next components
import Image from 'next/image';
import Link from 'next/link';
// Type interfaces
import { DrinkInfo, Ingredient, Item } from '@/types/index';
// Local components
import RecipeItem from './RecipeItem/RecipeItem';

export default function DrinkCard (props: { drink: DrinkInfo, getRandomDrink: Function, isRandom: boolean }) {
    const { drink, getRandomDrink, isRandom } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    function updateWidth (e: HTMLImageElement) {
        e.width = (e.height / e.naturalHeight) * e.naturalWidth;
    }

    function slug (item: Ingredient | DrinkInfo) {
        return `${item.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}`;
    }

    function getIngredientFromStore (ingredient: Ingredient, index: number) {
        const letter = ingredient.Name.charAt(0);

        // Try to find recipe ingredient
        for (const key of Object.keys(storedIngredients)) {
            if (storedIngredients[key].hasOwnProperty(letter)) {
                const item = storedIngredients[key][letter].filter((item: Item) => item.Name === ingredient.Name);
                
                if (item.length) {
                    return (
                        <RecipeItem 
                            key={index} 
                            ingredient={item[0]} 
                            isSub={false} />
                    );
                }
            }
        }

        // Try to find recipe substitute
        for (const key of Object.keys(storedIngredients)) {
            for (const letter of Object.keys(storedIngredients[key])) {
                if (storedIngredients[key][letter].find((item: Item) => item.Name === ingredient.Alias)) {
                    const alias = storedIngredients[key][letter].find((item: Item) => item.Name === ingredient.Alias);

                    if (alias) {
                        for (const letter of Object.keys(storedIngredients[key])) {
                            if (storedIngredients[key][letter].find((item: Item) => item.AliasId === alias.Id)) {
                                const substitute = storedIngredients[key][letter].find((item: Item) => item.AliasId === alias.Id);
    
                                if (substitute) {
                                    return (
                                        <RecipeItem 
                                            key={index}
                                            ingredient={substitute} 
                                            isSub={true} />
                                    );
                                }
                            }
                        }
                    }

                    if (alias) {
                        return (
                            <RecipeItem 
                                key={index} 
                                ingredient={alias} 
                                isSub={true} />
                        );
                    }
                }
            }
        }
    }

    return (
        <article className={styles.DrinkCard}>
            { isRandom && <button className={styles.reloadBtn} onClick={() => getRandomDrink()}>
                <Image 
                    alt='Get New Drink' 
                    src={require('/public/images/ui/refresh.svg')} 
                    width="48"
                    height="48" />
            </button> }
            <h2>{drink.Name}</h2>
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
            <Link href={`/drink/${slug(drink)}?page=drinks`}>
                <button className={styles.goBtn}>
                    <span>GO TO DRINK</span>
                    <Image 
                        alt="Go to Drink" 
                        src={require('/public/images/ui/keyboard_double_arrow_right.svg')} 
                        width="32" 
                        height="32" />
                </button>
            </Link>
        </article>
    );
}