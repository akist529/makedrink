// Page styles
import styles from './IngredientForm.module.scss';
// React components
import { useState } from 'react';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Local components
import IngredientFilter from '@/components/ui/IngredientFilter/IngredientFilter';
// Type interfaces
import { Item } from '@/types/index';
// Next components
import Image from 'next/image';

export default function IngredientForm (props: { ingredientType: string, drinkType: string }) {
    const { ingredientType, drinkType } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const [formOpen, setFormOpen] = useState(false);

    function getIngredients (type: string) {
        const filteredIngredients: Item[] = [];

        if (storedIngredients.hasOwnProperty(type)) {
            for (const key of Object.keys(storedIngredients[type])) {
                for (const ingredient of storedIngredients[type][key]) {
                    filteredIngredients.push(ingredient);
                }
            }
        }

        return filteredIngredients;
    }

    function childIngredients (item: Item) {
        const childIngredients = [];

        if (storedIngredients.hasOwnProperty(item.Type)) {
            for (const key of Object.keys(storedIngredients[item.Type])) {
                for (const ingredient of storedIngredients[item.Type][key]) {
                    if (ingredient.AliasId === item.Id) {
                    childIngredients.push(ingredient);
                    }
                }
            }
        }

        return childIngredients;
    }

    function ingredientIsParent (item: Item) {
        if (storedIngredients.hasOwnProperty(item.Type)) {
            for (const key of Object.keys(storedIngredients[item.Type])) {
                if (storedIngredients[item.Type][key].find((ingredient: Item) => ingredient.AliasId === item.Id)) {
                    return true;
                }
            }
        }

        return false;
    }

    function ingredientIsChild (item: Item) {
        if (storedIngredients.hasOwnProperty(item.Type)) {
            for (const key of Object.keys(storedIngredients[item.Type])) {
                if (storedIngredients[item.Type][key].find((ingredient: Item) => item.AliasId === ingredient.Id)) {
                    return true;
                }
            }
        }

        return false;
    }

    function toggleForm (e: any) {
        e.preventDefault();

        setFormOpen(prevState => !prevState);
    }

    return (
        <fieldset className={styles.IngredientForm}>
            <legend>
                <button onClick={toggleForm}>
                    <span>{ingredientType}</span>
                    <Image alt='Close Form Field' src={require('/public/images/ui/expand_more.svg')} />
                </button>
            </legend>
            { formOpen && 
                getIngredients(ingredientType).filter((ingredient: Item) => ingredientIsParent(ingredient)).map((ingredient: Item, index: number) => {
                    return (
                        <fieldset key={index}>
                            <legend>
                                <span>{ingredient.Name}</span>
                                <Image alt={ingredient.Name} src={require(`/public/images/ui/${ingredient.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}.webp`)} height="48" />
                            </legend>
                            { childIngredients(ingredient).filter((ingredient: Item) => ingredientIsChild(ingredient)).map((ingredient: Item, index: number) => {
                                return <IngredientFilter key={index} ingredient={ingredient} drinkType={drinkType} />
                            }) }
                            { childIngredients(ingredient).filter((ingredient: Item) => !ingredientIsChild(ingredient)).map((ingredient: Item, index: number) => {
                                return <IngredientFilter key={index} ingredient={ingredient} drinkType={drinkType} />
                            }) }
                        </fieldset>
                    );
                })
            }
            { formOpen && 
                getIngredients(ingredientType).filter((ingredient: Item) => (!ingredientIsParent(ingredient) && !ingredientIsChild(ingredient))).map((ingredient: Item, index: number) => {
                    return (
                        <>
                            <div>
                                <label htmlFor={ingredient.Name}>{ingredient.Name}</label>
                                <Image alt={ingredient.Name} src={require(`/public/images/ui/${ingredient.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}.webp`)} height="48" />
                            </div>
                            <input type="checkbox" id={ingredient.Name} name={ingredient.Name} value={ingredient.Name}/>
                        </>
                    );
                }) }
        </fieldset>
    );
}