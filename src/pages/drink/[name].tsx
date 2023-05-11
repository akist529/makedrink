import styles from '@/styles/Drink.module.scss'
import { useGetAllDrinkInfoQuery } from '@/store/api/api'
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { DrinkInfo, Ingredient, Item } from '@/types/index';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Image from 'next/image';

export default function DrinkPage () {
    const allDrinkInfo: DrinkInfo[] = (useGetAllDrinkInfoQuery().data || []);
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const { query, isReady } = useRouter();
    const [displayName, setDisplayName] = useState('');
    const [drinkInfo, setDrinkInfo] = useState({} as DrinkInfo);

    useEffect(() => {
        if (isReady) {
            getDrinkName();
        }
    }, [isReady]);

    useEffect(() => {
        if (displayName) {
            getDrinkInfo();
        }
    }, [displayName]);

    function getDrinkName () {
        let urlName;

        if (query.name) {
            urlName = query.name.toString().split('-');

            for (let i = 0; i < urlName.length; i++) {
                urlName[i] = urlName[i][0].toUpperCase() + urlName[i].slice(1);
            }

            setDisplayName(urlName.toString().replaceAll(',', ' '));
        }
    }

    function getDrinkInfo () {
        for (const drink of allDrinkInfo) {
            if (drink.Name === displayName) {
                setDrinkInfo(drink);
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
                            <li key={index}>
                                <span>{item.Name}</span>
                            </li>
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

        return (
            <li className={styles.missing} key={index}>
                <span>{ingredient.Alias ? ingredient.Alias : ingredient.Name}</span>
                <Image 
                    alt='Ingredient Missing'
                    src={require('public/images/ui/cancel.svg')}
                    width="24"
                    height="24"
                />
            </li>
        );
    }

    function getAltIngredient (ingredient: Item, index: number) {
        for (const key of Object.keys(storedIngredients[ingredient.Type])) {
            for (let i = 0; i < storedIngredients[ingredient.Type][key].length; i++) {
                if (storedIngredients[ingredient.Type][key][i].AliasId === ingredient.Id) {
                    return (
                        <li key={index}>
                            <span>{storedIngredients[ingredient.Type][key][i].Name}</span>
                        </li>
                    );
                }
            }
        }

        return (
            <li className={styles.missing} key={index}>
                <span>{ingredient.Name}</span>
            </li>
        );
    }

    return (
        <div className={styles.Drink}>
            { !drinkInfo.Name && <h1>Waiting...</h1> }
            { drinkInfo.Name && 
            <div>
                <h1>{drinkInfo.Name}</h1>
                <h2>Recipe</h2>
                <ul>
                    { drinkInfo.Recipe.map((ingredient, index) => {
                        return getIngredient(ingredient, index)
                    }) }
                </ul>
            </div> }
        </div>
    );
}