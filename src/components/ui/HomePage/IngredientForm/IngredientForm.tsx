// Page styles
import styles from './IngredientForm.module.scss';
// React components
import React, { useState } from 'react';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { selectIngredient, unselectIngredient } from '@/store/slices/ingredients.slice';
// Local components
import IngredientFilter from '@/components/ui/HomePage/IngredientFilter/IngredientFilter';
import FormLegend from './FormLegend/FormLegend';
import ParentForm from './ParentForm/ParentForm';
// Type interfaces
import { Item, IngredientDict } from '@/types/index';
// Next components
import Image from 'next/image';

export default function IngredientForm (props: { ingredientType: string }) {
    const { ingredientType } = props;
    const storedIngredients: IngredientDict = useSelector((state: RootState) => state.ingredients.stored);
    const [formOpen, setFormOpen] = useState(true);
    const dispatch = useDispatch();

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
        const childIngredients: Item[] = [];

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

    function updateWidth (e: HTMLImageElement) {
        e.width = (e.height / e.naturalHeight) * e.naturalWidth;
    }

    return (
        <fieldset className={formOpen ? [styles.IngredientForm, styles.formOpen].join(' ') : styles.IngredientForm}>
            <FormLegend 
                ingredientType={ingredientType} 
                setFormOpen={setFormOpen} />
            <ul className={formOpen ? [styles.gradient, styles.gradientOpen].join(' ') : [styles.gradient, styles.gradientClosed].join(' ')}>
                { getIngredients(ingredientType).filter((ingredient: Item) => ingredientIsParent(ingredient)).map((ingredient: Item, index: number) => {
                    return (
                        <ParentForm key={index} ingredient={ingredient} />
                    );
                }) }
                <ul className={styles.ingredientList}>
                    { getIngredients(ingredientType).filter((ingredient: Item) => (!ingredientIsParent(ingredient) && !ingredientIsChild(ingredient))).map((ingredient: Item, index: number) => {
                        return (
                            <IngredientFilter 
                                key={index} 
                                ingredient={ingredient} 
                                showImage={true} />
                        );
                    }) }
                </ul>
            </ul>
        </fieldset>
    );
}