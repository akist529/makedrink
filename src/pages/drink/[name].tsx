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
import Footer from '@/components/footer/Footer';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

const DrinkPage: NextPage = () => {
    // RTK Queries
    const allDrinks = useGetAllDrinksQuery();
    const [getDrinkInfo, drinkInfoResult] = useLazyGetDrinkInfoQuery();

    // Redux store states
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const favoriteDrinks = useSelector((state: RootState) => state.drinks.favorites);
    const blockedDrinks = useSelector((state: RootState) => state.drinks.blocked);
    
    // Local state management
    const [drinkError, setDrinkError] = useState(false);
    const [recipeError, setRecipeError] = useState(false);
    const [drinkInfo, setDrinkInfo] = useState({} as DrinkInfo);
    const [drinkFavorited, setDrinkFavorited] = useState(drinkIsFavorited(drinkInfo));
    const [favoriteImagePath, setFavoriteImagePath] = useState(require('/public/images/ui/heart_plus.svg'));
    const [drinkBlocked, setDrinkBlocked] = useState(drinkIsBlocked(drinkInfo));

    // Next functions
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (router.isReady && allDrinks.isSuccess) {
            const displayName = getDrinkName();
            fetchDrinkInfo(displayName);
        }
    }, [router.isReady, allDrinks.isLoading]);

    useEffect(() => {
        if (drinkInfoResult && drinkInfoResult.data) {
            setDrinkInfo(drinkInfoResult.data);
            setDrinkFavorited(drinkIsFavorited(drinkInfo));
            setDrinkBlocked(drinkIsBlocked(drinkInfo));
        }
    }, [drinkInfoResult]);

    useEffect(() => {
        if (Object.keys(drinkInfo).length 
            && drinkIsFavorited(drinkInfo)) {
            setDrinkFavorited(true);
        } else {
            setDrinkFavorited(false);
        }
    }, [favoriteDrinks]);

    useEffect(() => {
        if (Object.keys(drinkInfo).length 
            && drinkIsBlocked(drinkInfo)) {
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
        if (allDrinks.data) {
            for (const drink of allDrinks.data.Drinks) {
                if (drink.Name.toLowerCase() === displayName.toLowerCase()) {
                    getDrinkInfo(drink.Id);
                }
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
                            <RecipeItem 
                                key={index} 
                                ingredient={ingredient} 
                                unit={ingredient.Unit} 
                                amount={ingredient.Amount}
                                missing={false} />
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
                        return getAltIngredient(item, index, ingredient.Unit, ingredient.Amount);
                    }
                }
            }
        }

        if (!recipeError) {
            setRecipeError(true);
        }
        
        return (
            <RecipeItem 
                key={index} 
                ingredient={ingredient} 
                unit={ingredient.Unit} 
                amount={ingredient.Amount} 
                missing={true} />
        );
    }

    function getAltIngredient (ingredient: Item, index: number, unit: string, amount: number) {
        for (const key of Object.keys(storedIngredients[ingredient.Type])) {
            for (let i = 0; i < storedIngredients[ingredient.Type][key].length; i++) {
                if (storedIngredients[ingredient.Type][key][i].AliasId === ingredient.Id) {
                    return (
                        <RecipeItem 
                            key={index} 
                            ingredient={ingredient} 
                            unit={unit} 
                            amount={amount} 
                            missing={false} />
                    );
                }
            }
        }

        if (!recipeError) {
            setRecipeError(true);
        }

        return (
            <RecipeItem 
                key={index} 
                ingredient={ingredient} 
                unit={unit} 
                amount={amount}
                missing={true} />
        );
    }

    function favoriteDrink (drink: DrinkInfo) {
        if (favoriteDrinks.hasOwnProperty(drink.Name.charAt(0))) {
            if (favoriteDrinks[drink.Name.charAt(0)].find((item: DrinkInfo) => item.Name === drink.Name)) {
                dispatch(removeFavoriteDrink(drink));
                return;
            }
        }

        dispatch(addFavoriteDrink(drink));
        dispatch(removeBlockedDrink(drink));
    }

    function blockDrink (drink: DrinkInfo) {
        if (blockedDrinks.hasOwnProperty(drink.Name.charAt(0))) {
            if (blockedDrinks[drink.Name.charAt(0)].find((item: DrinkInfo) => item.Name === drink.Name)) {
                dispatch(removeBlockedDrink(drink));
                return;
            }
        }

        dispatch(addBlockedDrink(drink));
        dispatch(removeFavoriteDrink(drink));
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
        <div className={styles.DrinkPage}>
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
                        <button className={drinkBlocked ? styles.blocked : styles.unblocked} onClick={() => blockDrink(drinkInfo)}>
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
            <Footer />
        </div>
    );
}

export default DrinkPage;