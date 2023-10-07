// Component styles
import styles from './IngredientField.module.scss';
// Type interfaces
import { Item, Ingredient } from '@/types/index';
// Helper functions
import getItemName from '@/helpers/getItemName';
// React components
import { useState, useMemo, useCallback } from 'react';

export default function IngredientField (props: { i: number, ingredients: Item[], removeIngredient: Function, value: Ingredient }) {
    const { i, ingredients, removeIngredient, value } = props;

    const [ingredient, setIngredient] = useState(() => {
        return (document.getElementById(`item-${i}-name`) as HTMLSelectElement)?.value;
    });

    const ingredientId = useMemo(() => {
        if (value && value.hasOwnProperty('Name')) {
            const ingredient = ingredients.find((item: Item) => item.Name === value.Name);
            if (ingredient) return ingredient.Id;    
        }

        return "";
    }, [ingredients, value]);

    const unit = useMemo(() => {
        if (ingredient === "21" || ingredient === "60" || ingredient === "69" || ingredient === "82" || ingredient === "117" || ingredient === "119" || ingredient === "149") {
            return "dash";
        } else if (ingredient === "40") {
            return "leaves";
        } else if (ingredient === "46") {
            return "whole";
        } else {
            return "oz";
        }
    }, [ingredient]);

    const handleChange = useCallback((e: React.FormEvent<HTMLSelectElement>) => {
        setIngredient(e.currentTarget.value);
        (document.getElementById(`item-${i}-unit`) as HTMLSpanElement).innerHTML = unit;
    }, [i, unit]);

    const amount = useMemo(() => {
        if (value && value.hasOwnProperty('Amount')) {
            return value.Amount.toString();
        } else {
            return "0";
        }
    }, [value]);

    const liquorItems = useMemo(() => {
        return ingredients.filter((ingredient: Item) => ingredient.Type === 'liquor');
    }, [ingredients]);

    const liqueurItems = useMemo(() => {
        return ingredients.filter((ingredient: Item) => ingredient.Type === 'liqueur');
    }, [ingredients]);

    const otherItems = useMemo(() => {
        return ingredients.filter((ingredient: Item) => ingredient.Type === 'other');
    }, [ingredients]);

    const wineItems = useMemo(() => {
        return ingredients.filter((ingredient: Item) => ingredient.Type === 'wine');
    }, [ingredients]);

    const carbonatedItems = useMemo(() => {
        return ingredients.filter((ingredient: Item) => ingredient.Type === 'carbonated');
    }, [ingredients]);

    const juiceItems = useMemo(() => {
        return ingredients.filter((ingredient: Item) => ingredient.Type === 'juice');
    }, [ingredients]);

    const mixerItems = useMemo(() => {
        return ingredients.filter((ingredient: Item) => ingredient.Type === 'mixer');
    }, [ingredients]);

    return (
        <li id={`item-${i}-container`} className={styles.IngredientField}>
            <select name={`item-${i}-name`} id={`item-${i}-name`} defaultValue={ingredientId} onChange={handleChange}>
                <option value="" disabled>Select an ingredient</option>
                <optgroup label="Liquor">
                { liquorItems.map((ingredient: Item, index: number) => {
                    return (
                        <option key={index} value={ingredient.Id}>{getItemName(ingredient)}</option>
                    );
                }) }
                </optgroup>
                <optgroup label="Liqueur">
                { liqueurItems.map((ingredient: Item, index: number) => {
                    return (
                        <option key={index} value={ingredient.Id}>{getItemName(ingredient)}</option>
                    );
                }) }
                </optgroup>
                <optgroup label="Other">
                { otherItems.map((ingredient: Item, index: number) => {
                    return (
                        <option key={index} value={ingredient.Id}>{getItemName(ingredient)}</option>
                    );
                }) }
                </optgroup>
                <optgroup label="Wine">
                { wineItems.map((ingredient: Item, index: number) => {
                    return (
                        <option key={index} value={ingredient.Id}>{getItemName(ingredient)}</option>
                    );
                }) }
                </optgroup>
                <optgroup label="Carbonated">
                { carbonatedItems.map((ingredient: Item, index: number) => {
                    return (
                        <option key={index} value={ingredient.Id}>{getItemName(ingredient)}</option>
                    );
                }) }
                </optgroup>
                <optgroup label="Juice">
                { juiceItems.map((ingredient: Item, index: number) => {
                    return (
                        <option key={index} value={ingredient.Id}>{getItemName(ingredient)}</option>
                    );
                }) }
                </optgroup>
                <optgroup label="Mixer">
                { mixerItems.map((ingredient: Item, index: number) => {
                    return (
                        <option key={index} value={ingredient.Id}>{getItemName(ingredient)}</option>
                    );
                }) }
                </optgroup>
            </select>
            <input 
                type="number" 
                min="0.25" 
                step="0.25" 
                id={`item-${i}-amount`} 
                name={`item-${i}-amount`}
                placeholder={amount}/>
            <span id={`item-${i}-unit`}>{unit}</span>
            <button
                title='Remove Ingredient'
                onClick={e => removeIngredient(e, i)}
            ></button>
        </li>
    );
}