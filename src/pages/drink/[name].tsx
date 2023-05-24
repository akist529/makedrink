// Page styles
import styles from '@/styles/Drink.module.scss';
// Redux components
import { useGetAllDrinksQuery, useLazyGetDrinkInfoQuery } from '@/store/api/api';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addFavoriteDrink, removeFavoriteDrink, addBlockedDrink, removeBlockedDrink } from '@/store/slices/drinks.slice';
// Next components
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
// React components
import { useState, useEffect } from 'react';
// Type interfaces
import { DrinkInfo, Ingredient, Item } from '@/types/index';
// Local components
import RecipeItem from '@/components/ui/DrinkPage/RecipeItem/RecipeItem';

const DrinkPage: NextPage = () => {
    const allDrinks: any = useGetAllDrinksQuery().data || [];
    const [getDrinkInfo, result] = useLazyGetDrinkInfoQuery();
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const favoriteDrinks = useSelector((state: RootState) => state.drinks.favorites);
    const blockedDrinks = useSelector((state: RootState) => state.drinks.blocked);
    const router = useRouter();
    const [drinkError, setDrinkError] = useState(false);
    const [recipeError, setRecipeError] = useState(false);
    const [drinkInfo, setDrinkInfo] = useState({} as DrinkInfo);
    const dispatch = useDispatch();
    const [drinkFavorited, setDrinkFavorited] = useState(drinkIsFavorited(drinkInfo));
    const [favoriteImagePath, setFavoriteImagePath] = useState(require('/public/images/ui/heart_plus.svg'));
    const [drinkBlocked, setDrinkBlocked] = useState(drinkIsBlocked(drinkInfo));

    useEffect(() => {
        if (router.isReady && allDrinks) {
            const displayName = getDrinkName();
            fetchDrinkInfo(displayName);
        }
    }, [router.isReady, allDrinks]);

    useEffect(() => {
        if (result && result.data) {
            setDrinkInfo(result.data);
            setDrinkFavorited(drinkIsFavorited(drinkInfo));
        }
    }, [result]);

    useEffect(() => {
        if (Object.keys(drinkInfo).length && drinkIsFavorited(drinkInfo)) {
            setDrinkFavorited(true);
        } else {
            setDrinkFavorited(false);
        }
    }, [favoriteDrinks]);

    useEffect(() => {
        if (Object.keys(drinkInfo).length && drinkIsBlocked(drinkInfo)) {
            setDrinkBlocked(true);
        } else {
            setDrinkBlocked(false);
        }
    }, [blockedDrinks]);

    useEffect(() => {
        if (drinkFavorited) {
            setFavoriteImagePath(require('/public/images/ui/favorite.svg'));
        } else {
            setFavoriteImagePath(require('/public/images/ui/heart_plus.svg'));
        }
    }, [drinkFavorited]);

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
                        return (<RecipeItem key={index} ingredient={ingredient} missing={false} />);
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
        
        return (<RecipeItem key={index} ingredient={ingredient} missing={true} />);
    }

    function getAltIngredient (ingredient: Item, index: number) {
        for (const key of Object.keys(storedIngredients[ingredient.Type])) {
            for (let i = 0; i < storedIngredients[ingredient.Type][key].length; i++) {
                if (storedIngredients[ingredient.Type][key][i].AliasId === ingredient.Id) {
                    return (<RecipeItem key={index} ingredient={ingredient} missing={false} />);
                }
            }
        }

        if (!recipeError) {
            setRecipeError(true);
        }

        return (<RecipeItem key={index} ingredient={ingredient} missing={true} />);
    }

    function updateWidth (e: HTMLImageElement) {
        e.width = (e.height / e.naturalHeight) * e.naturalWidth;
    }

    function favoriteDrink (drink: DrinkInfo) {
        if (favoriteDrinks.hasOwnProperty(drink.Name.charAt(0))) {
            if (favoriteDrinks[drink.Name.charAt(0)].find((item: DrinkInfo) => item.Name === drink.Name)) {
                dispatch(removeFavoriteDrink(drink));
                return;
            }
        }

        dispatch(addFavoriteDrink(drink));
    }

    function blockDrink (drink: DrinkInfo) {
        if (blockedDrinks.hasOwnProperty(drink.Name.charAt(0))) {
            if (blockedDrinks[drink.Name.charAt(0)].find((item: DrinkInfo) => item.Name === drink.Name)) {
                dispatch(removeBlockedDrink(drink));
                return;
            }
        }

        dispatch(addBlockedDrink(drink));
    }

    function drinkIsFavorited (drink: DrinkInfo) {
        if (Object.keys(drink).length && favoriteDrinks.hasOwnProperty(drink.Name.charAt(0))) {
            if (favoriteDrinks[drink.Name.charAt(0)].find((item: DrinkInfo) => item.Name === drink.Name)) {
                return true;
            }
        }

        return false;
    }
    
    function drinkIsBlocked (drink: DrinkInfo) {
        if (Object.keys(drink).length && blockedDrinks.hasOwnProperty(drink.Name.charAt(0))) {
            if (blockedDrinks[drink.Name.charAt(0)].find((item: DrinkInfo) => item.Name === drink.Name)) {
                return true;
            }
        }

        return false;
    }

    return (
        <div className={styles.Drink}>
            { !drinkError && !drinkInfo.Name && <strong>Waiting...</strong> }
            { drinkError && <strong>The drink you entered does not exist!</strong> }
            { drinkInfo.Name && 
            <main>
                { recipeError && <strong>You are missing ingredients for this recipe!</strong> }
                <header>
                    <h1>{drinkInfo.Name}</h1>
                    <div>
                        <button className={drinkFavorited ? styles.favorited : styles.unfavorited} onClick={() => favoriteDrink(drinkInfo)}>
                            <Image 
                                alt='Favorite Drink' 
                                title='Favorite Drink' 
                                src={favoriteImagePath} 
                                width="0" 
                                height="48"
                                onLoadingComplete={e => updateWidth(e)} />
                        </button>
                        <button className={drinkBlocked ? styles.unblocked : styles.blocked} onClick={() => blockDrink(drinkInfo)}>
                            <Image 
                                alt='Block Drink' 
                                title='Block Drink' 
                                src={require('/public/images/ui/block.svg')} 
                                width="0" 
                                height="48" 
                                onLoadingComplete={e => updateWidth(e)} />
                        </button>
                    </div>
                </header>
                <section>
                    <h2>Ingredients</h2>
                    <ul>
                        { drinkInfo.Recipe.map((ingredient, index) => {
                            return getIngredient(ingredient, index);
                        }) }
                    </ul>
                </section>
                <section>
                    <article>
                        { drinkInfo.Directions.map((direction, index) => {
                            return (
                                <div key={index}>
                                    <p>{direction}</p>
                                    <hr/>
                                </div>
                            );
                        }) }
                    </article>
                </section>
                <figure>
                    <Image 
                        alt='Cocktail' 
                        src={require('/public/images/ui/cocktail-placeholder.jpg')} 
                        width="0" 
                        height="256" 
                        onLoadingComplete={e => updateWidth(e)} />
                </figure>
            </main> }
        </div>
    );
}

export default DrinkPage;