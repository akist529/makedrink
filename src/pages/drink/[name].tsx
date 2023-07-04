// Page styles
import styles from '@/styles/Drink.module.scss';
// Redux components
import { useGetAllIngredientsQuery, useGetAllDrinksQuery, useLazyGetDrinkInfoQuery, useGetUserQuery } from '@/store/api/api';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addFavoriteDrink, removeFavoriteDrink, addBlockedDrink, removeBlockedDrink } from '@/store/slices/drinks.slice';
// Next components
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
// React components
import { useState, useEffect, useCallback, useMemo } from 'react';
// Type interfaces
import { DrinkInfo, Ingredient, Item } from '@/types/index';
// Local components
import RecipeItem from '@/components/ui/DrinkPage/RecipeItem/RecipeItem';
import Footer from '@/components/footer/Footer';
import LoadingAnimation from '@/components/loading/LoadingAnimation';
import EditDrinkButton from '@/components/buttons/EditDrinkButton/EditDrinkButton';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import Cookies from 'js-cookie';
import getSlug from '@/helpers/getSlug';

const DrinkPage: NextPage = () => {
    // RTK Queries
    const allDrinks = useGetAllDrinksQuery();
    const [getDrinkInfo, drinkInfoResult] = useLazyGetDrinkInfoQuery();
    const allIngredients = useGetAllIngredientsQuery();
    const user = useGetUserQuery();

    // Redux store states
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const favoriteDrinks = useSelector((state: RootState) => state.drinks.favorites);
    const blockedDrinks = useSelector((state: RootState) => state.drinks.blocked);
    
    // Next functions
    const router = useRouter();
    const dispatch = useDispatch();

    // Local state management
    const [drinkError, setDrinkError] = useState(false);
    const [recipeError, setRecipeError] = useState(false);
    const [drinkInfo, setDrinkInfo] = useState({} as DrinkInfo);
    const [ingredients, setIngredients] = useState([] as Item[]);

    const isUser = useMemo(() => {
        if (user.isSuccess && user.data.LoggedIn) {
            return true;
        } return false;
    }, [user]);

    useEffect(() => {
        if (allIngredients.isSuccess) {
            setIngredients(allIngredients.data);
        }
    }, [allIngredients]);

    const getDrinkName = useCallback(() => {
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
    }, [router.query.name]);

    const fetchDrinkInfo = useCallback((displayName: string) => {
        if (allDrinks.data) {
            for (const drink of allDrinks.data.Drinks) {
                if (drink.Name.toLowerCase().replaceAll('ä', 'a') === displayName.toLowerCase()) {
                    getDrinkInfo(drink.Id);
                }
            }
        }
    }, [allDrinks.data, getDrinkInfo]);

    const getAltIngredient = useCallback((ingredient: Item, index: number, unit: string, amount: number, prefers: string) => {
        const type = ingredient.Type || '';

        if (!storedIngredients[type]) return (
            <><RecipeItem 
                key={index} 
                ingredient={ingredient} 
                unit={unit} 
                amount={amount}
                missing={true} 
                prefers={prefers} />
            <hr/></>);

        for (const key of Object.keys(storedIngredients[type])) {
            for (const item of storedIngredients[type][key]) {
                if ((ingredient.Id === item.AliasId) || (ingredient.Name === item.Name)) {
                    return (
                        <>
                        <RecipeItem 
                            key={index} 
                            ingredient={item} 
                            unit={unit} 
                            amount={amount} 
                            missing={false} 
                            prefers={prefers} />
                        <hr/>
                        </>
                    );
                }
            }
        }

        if (!recipeError) {
            setRecipeError(true);
        }

        return (
            <>
            <RecipeItem 
                key={index} 
                ingredient={ingredient} 
                unit={unit} 
                amount={amount}
                missing={true} 
                prefers={prefers} />
            <hr/>
            </>
        );
    }, [recipeError, storedIngredients]);

    const getIngredientAlias = useCallback((ingredient: Ingredient, index: number) => {
        if (ingredient.Alias) {
            const letter = ingredient.Alias.charAt(0);

            for (const type of Object.keys(storedIngredients)) {
                if (storedIngredients[type].hasOwnProperty(letter)) {
                    for (const item of storedIngredients[type][letter]) {
                        if (item.Name === ingredient.Alias) {
                            return getAltIngredient(item, index, ingredient.Unit, ingredient.Amount, ingredient.Name);
                        }
                    }
                }
            }

            const aliasId = ingredients.find((item: Item) => item.Name === ingredient.Alias)?.Id;

            for (const type of Object.keys(storedIngredients)) {
                for (const key of Object.keys(storedIngredients[type])) {
                    const alt = storedIngredients[type][key].find((item: Item) => item.AliasId === aliasId);

                    if (alt) {
                        return (<>
                            <RecipeItem 
                                key={index} 
                                ingredient={alt} 
                                unit={ingredient.Unit} 
                                amount={ingredient.Amount} 
                                missing={false} 
                                prefers={ingredient.Name} />
                            <hr/>
                        </>);
                    }
                }
            }
        } else {
            const alias = ingredients.find((item: Item) => item.Name === ingredient.Name);

            if (alias) {
                return getAltIngredient(alias, index, ingredient.Unit, ingredient.Amount, ingredient.Name);
            }
        }

        if (!recipeError) {
            setRecipeError(true);
        }
        
        return (
            <>
            <RecipeItem 
                key={index} 
                ingredient={ingredient} 
                unit={ingredient.Unit} 
                amount={ingredient.Amount} 
                missing={true} 
                prefers={ingredient.Name} />
            <hr/>
            </>
        );
    }, [getAltIngredient, recipeError, storedIngredients, ingredients]);

    const getIngredient = useCallback((ingredient: Ingredient, index: number) => {
        const letter = ingredient.Name.charAt(0);

        for (const type of Object.keys(storedIngredients)) {
            if (storedIngredients[type].hasOwnProperty(letter)) {
                for (const item of storedIngredients[type][letter]) {
                    if (item.Name === ingredient.Name) {
                        return (<>
                            <RecipeItem 
                                key={index} 
                                ingredient={ingredient} 
                                unit={ingredient.Unit} 
                                amount={ingredient.Amount}
                                missing={false} 
                                prefers={ingredient.Name} />
                            <hr/>
                        </>);
                    }
                }
            }
        }

        return getIngredientAlias(ingredient, index);
    }, [getIngredientAlias, storedIngredients]);

    const favoriteDrink = useCallback((drink: DrinkInfo) => {
        if (favoriteDrinks.hasOwnProperty(drink.Name.charAt(0))) {
            if (favoriteDrinks[drink.Name.charAt(0)].find((item: DrinkInfo) => item.Name === drink.Name)) {
                dispatch(removeFavoriteDrink(drink));
                return;
            }
        }

        dispatch(addFavoriteDrink(drink));
        dispatch(removeBlockedDrink(drink));
    }, [dispatch, favoriteDrinks]);

    const blockDrink = useCallback((drink: DrinkInfo) => {
        if (blockedDrinks.hasOwnProperty(drink.Name.charAt(0))) {
            if (blockedDrinks[drink.Name.charAt(0)].find((item: DrinkInfo) => item.Name === drink.Name)) {
                dispatch(removeBlockedDrink(drink));
                return;
            }
        }

        dispatch(addBlockedDrink(drink));
        dispatch(removeFavoriteDrink(drink));
    }, [blockedDrinks, dispatch]);

    const drinkIsFavorited = useCallback((drink: DrinkInfo) => {
        if (Object.keys(drink).length && favoriteDrinks.hasOwnProperty(drink.Name.charAt(0))) {
            if (favoriteDrinks[drink.Name.charAt(0)].find((item: DrinkInfo) => item.Name === drink.Name)) {
                return true;
            }
        }

        return false;
    }, [favoriteDrinks]);
    
    const drinkIsBlocked = useCallback((drink: DrinkInfo) => {
        if (Object.keys(drink).length && blockedDrinks.hasOwnProperty(drink.Name.charAt(0))) {
            if (blockedDrinks[drink.Name.charAt(0)].find((item: DrinkInfo) => item.Name === drink.Name)) {
                return true;
            }
        }

        return false;
    }, [blockedDrinks]);

    const [drinkFavorited, setDrinkFavorited] = useState(drinkIsFavorited(drinkInfo));
    const [favoriteImagePath, setFavoriteImagePath] = useState(require('/public/images/ui/heart_plus.svg'));
    const [drinkBlocked, setDrinkBlocked] = useState(drinkIsBlocked(drinkInfo));    

    useEffect(() => {
        if (router.isReady && allDrinks.isSuccess) {
            const displayName = getDrinkName();
            fetchDrinkInfo(displayName);
        }
    }, [router.isReady, allDrinks.isLoading, allDrinks.isSuccess, fetchDrinkInfo, getDrinkName]);

    useEffect(() => {
        if (drinkInfoResult && drinkInfoResult.data) {
            setDrinkInfo(drinkInfoResult.data);
            setDrinkFavorited(drinkIsFavorited(drinkInfo));
            setDrinkBlocked(drinkIsBlocked(drinkInfo));
        }
    }, [drinkInfoResult, drinkInfo, drinkIsBlocked, drinkIsFavorited]);

    useEffect(() => {
        if (Object.keys(drinkInfo).length 
            && drinkIsFavorited(drinkInfo)) {
            setDrinkFavorited(true);
        } else {
            setDrinkFavorited(false);
        }
    }, [favoriteDrinks, drinkInfo, drinkIsFavorited]);

    useEffect(() => {
        if (Object.keys(drinkInfo).length 
            && drinkIsBlocked(drinkInfo)) {
            setDrinkBlocked(true);
        } else {
            setDrinkBlocked(false);
        }
    }, [blockedDrinks, drinkInfo, drinkIsBlocked]);

    useEffect(() => {
        if (drinkFavorited) {
            setFavoriteImagePath(require('/public/images/ui/favorite.svg'));
        } else {
            setFavoriteImagePath(require('/public/images/ui/heart_plus.svg'));
        }
    }, [drinkFavorited]);

    const isMocktail = useMemo(() => {
        if (drinkInfo.hasOwnProperty('Recipe')) {
            for (const ingredient of drinkInfo.Recipe) {
                const item = ingredients.find((item: Item) => item.Name === ingredient.Name);
    
                if (!item) return false;
    
                if (item.Type === 'liquor' || item.Type === 'liqueur' || item.Type === 'other' || item.Type === 'wine') {
                    return false;
                }
            }
    
            return true;
        }

        return false;
    }, [drinkInfo, ingredients]);

    return (
        <div className={['page', styles.DrinkPage].join(' ')}>
        { ingredients.length > 0 && 
        <>
        { !drinkError && !drinkInfo.Name && 
            <><Head>
                <title>Loading... - MakeDrink</title>
            </Head>
            <LoadingAnimation /></> }
        { drinkError && 
            <><Head>
                <title>Error - MakeDrink</title>
            </Head>
            <strong>The drink you entered does not exist!</strong></> }
        { drinkInfo.Name && 
            <main>
                <Head>
                    <title>{drinkInfo.Name} - MakeDrink</title>
                </Head>
                { recipeError && 
                    <strong>You are missing ingredients for this recipe!</strong> }
                <header>
                    <div className={styles.drinkTitle}>
                        <h1>{drinkInfo.Name}</h1>
                        { isMocktail && 
                            <Image 
                                alt='Mocktail' 
                                src={require('/public/images/ui/no_drinks.svg')} 
                                width="0" 
                                height="36" 
                                title='Mocktail' 
                                onLoadingComplete={e => updateWidth(e)} /> }
                    </div>
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
                    { isUser && 
                        <EditDrinkButton drink={getSlug(drinkInfo.Name) || ''} /> }
                </header>
                <section className={styles.ingredients}>
                    <h2>Ingredients</h2>
                    <ul>
                    { drinkInfo.Recipe.map((ingredient, index) => {
                        return getIngredient(ingredient, index);
                    }) }
                    </ul>
                </section>
                <section className={styles.directions}>
                    <h2>Directions</h2>
                    <ol>
                    { drinkInfo.Directions.map((direction, index) => {
                        return (
                            <li key={index}>
                                <p>{direction}</p>
                                <hr/>
                            </li>
                        );
                    }) }
                    </ol>
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
        </> }
        </div>
    );
}

export default DrinkPage;