// Component styles
import styles from './DrinkCard.module.scss';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setRandomDrink } from '@/store/slices/drinks.slice';
// React components
import { useCallback } from 'react';
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

export default function DrinkCard (props: { drink: DrinkInfo, isRandom: boolean, ingredients: Item[] }) {
    const { drink, isRandom, ingredients } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const possibleDrinks = useSelector((state: RootState) => state.drinks.possible);
    const randomDrink = useSelector((state: RootState) => state.drinks.random);
    const dispatch = useDispatch();

    const getIngredientFromStore = useCallback((ingredient: Ingredient, index: number) => {
        // Try to find recipe ingredient
        const item = findItemInStore(storedIngredients, ingredient.Name);

        if (item !== undefined) {
            return (
                <RecipeItem 
                    key={index} 
                    ingredient={item} 
                    preferred={ingredient} 
                    isSub={false} />
            );
        }

        // If parent ingredient, try to find child ingredient
        if (!ingredient.IsAlias) {
            console.log(ingredient.Name, ingredients.length);
            const item = ingredients.find((item: Item) => item.Name === ingredient.Name);
            
            if (item) {
                const alias = (() => {
                    for (const type of Object.keys(storedIngredients)) {
                        for (const key of Object.keys(storedIngredients[type])) {
                            const foundAlt = storedIngredients[type][key].find((altItem: Item) => altItem.AliasId === item.Id);

                            if (foundAlt) {
                                return foundAlt;
                            }
                        }
                    }
                })();

                if (alias) {
                    return (
                        <RecipeItem 
                            key={index} 
                            ingredient={alias} 
                            preferred={ingredient} 
                            isSub={true} />
                    );
                }
            }
        }

        // Try to find recipe substitute
        const alias = ingredients.find((item: Item) => item.Name === ingredient.Alias);

        if (alias) {
            const alt = findAltInStore(storedIngredients, alias, ingredient.Name);

            if (alt !== undefined) {
                return (
                    <RecipeItem 
                        key={index}
                        ingredient={alt} 
                        preferred={ingredient} 
                        isSub={true} />
                );
            }
        }

        const storedAlias = findAliasInStore(storedIngredients, ingredient);

        if (storedAlias !== undefined) {
            return (
                <RecipeItem 
                    key={index}
                    ingredient={storedAlias} 
                    preferred={ingredient} 
                    isSub={true} />
            );
        }

        // Show ingredient as missing 
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
                preferred={ingredient} 
                isSub={false} />
        );
    }, [storedIngredients, ingredients]);

    const handleClick = useCallback(() => {
        const drink = getRandomDrink(possibleDrinks, randomDrink);
        
        if (drink) {
            setTimeout(() => dispatch(setRandomDrink(drink)), 250);
            document.querySelector(`.${styles.DrinkCard}`)?.classList.add(`${styles.animating}`);
            setTimeout(() => document.querySelector(`.${styles.DrinkCard}`)?.classList.remove(`${styles.animating}`), 500);
        }
    }, [dispatch, possibleDrinks, randomDrink]);

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
                            title='Get New Drink' 
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