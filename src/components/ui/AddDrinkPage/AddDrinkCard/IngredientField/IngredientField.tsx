// Component styles
import styles from './IngredientField.module.scss';
// Type interfaces
import { Item } from '@/types/index';
// Helper functions
import getItemName from '@/helpers/getItemName';
import updateWidth from '@/helpers/updateWidth';
// Next components
import Image from 'next/image';
// React components
import { useState, useEffect } from 'react';

export default function IngredientField (props: { i: number, ingredients: Item[], removeIngredient: Function }) {
    const { i, ingredients, removeIngredient } = props;
    const [ingredient, setIngredient] = useState(() => {
        return (document.getElementById(`item-${i}-name`) as HTMLSelectElement)?.value;
    });
    const [unit, setUnit] = useState("oz");

    useEffect(() => {
        setUnit(() => {
            if (ingredient === "21") {
                return "dash";
            } else if (ingredient === "40") {
                return "leaves";
            } else if (ingredient === "46") {
                return "whole";
            } else {
                return "oz";
            }
        })
    }, [ingredient]);

    function handleChange (e: React.FormEvent<HTMLSelectElement>) {
        setIngredient(e.currentTarget.value);

        (document.getElementById(`item-${i}-unit`) as HTMLSpanElement).innerHTML = (() => {
            if (ingredient === "21") {
                return "dash";
            } else if (ingredient === "40") {
                return "leaves";
            } else if (ingredient === "46") {
                return "whole";
            } else {
                return "oz";
            }
        })();
    }

    return (
        <div id={`item-${i}-container`} className={styles.IngredientField}>
            <div>
                <select name={`item-${i}-name`} id={`item-${i}-name`} defaultValue="" onChange={handleChange}>
                    <option value="" disabled>Select an ingredient</option>
                    <optgroup label="Liquor">
                    { ingredients.filter((ingredient: Item) => ingredient.Type === 'liquor').map((ingredient: Item, index: number) => {
                        return (
                            <option key={index} value={ingredient.Id}>{getItemName(ingredient)}</option>
                        );
                    }) }
                    </optgroup>
                    <optgroup label="Liqueur">
                    { ingredients.filter((ingredient: Item) => ingredient.Type === 'liqueur').map((ingredient: Item, index: number) => {
                        return (
                            <option key={index} value={ingredient.Id}>{getItemName(ingredient)}</option>
                        );
                    }) }
                    </optgroup>
                    <optgroup label="Other">
                    { ingredients.filter((ingredient: Item) => ingredient.Type === 'other').map((ingredient: Item, index: number) => {
                        return (
                            <option key={index} value={ingredient.Id}>{getItemName(ingredient)}</option>
                        );
                    }) }
                    </optgroup>
                    <optgroup label="Wine">
                    { ingredients.filter((ingredient: Item) => ingredient.Type === 'wine').map((ingredient: Item, index: number) => {
                        return (
                            <option key={index} value={ingredient.Id}>{getItemName(ingredient)}</option>
                        );
                    }) }
                    </optgroup>
                    <optgroup label="Carbonated">
                    { ingredients.filter((ingredient: Item) => ingredient.Type === 'carbonated').map((ingredient: Item, index: number) => {
                        return (
                            <option key={index} value={ingredient.Id}>{getItemName(ingredient)}</option>
                        );
                    }) }
                    </optgroup>
                    <optgroup label="Juice">
                    { ingredients.filter((ingredient: Item) => ingredient.Type === 'juice').map((ingredient: Item, index: number) => {
                        return (
                            <option key={index} value={ingredient.Id}>{getItemName(ingredient)}</option>
                        );
                    }) }
                    </optgroup>
                    <optgroup label="Mixer">
                    { ingredients.filter((ingredient: Item) => ingredient.Type === 'mixer').map((ingredient: Item, index: number) => {
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
                    placeholder="Amount"/>
                <span id={`item-${i}-unit`}>{unit}</span>
                <button onClick={e => removeIngredient(e, i)}>
                    <Image 
                        alt="Remove Ingredient"
                        src={require('/public/images/ui/cancel.svg')} 
                        width="0" 
                        height="16" 
                        onLoadingComplete={e => updateWidth(e)} />
                </button>
            </div>
        </div>
    );
}