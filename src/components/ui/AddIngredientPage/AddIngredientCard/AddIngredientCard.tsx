// Component styles
import styles from './AddIngredientCard.module.scss';
// Redux components
import { useGetAllIngredientsQuery } from '@/store/api/api';
// React components
import { useState, useEffect, useId } from 'react';
// Type interfaces
import { Item } from '@/types/index';
// Helper functions
import getItemName from '@/helpers/getItemName';

export default function AddIngredientCard () {
    const allIngredients = useGetAllIngredientsQuery();
    const [ingredients, setIngredients] = useState([] as Item[]);
    const name = useId();
    const type = useId();
    const alias = useId();
    const icon = useId();

    useEffect(() => {
        if (allIngredients.isSuccess) {
            const filteredIngredients = allIngredients.data.filter((ingredient: Item) => {
                if (!ingredient.AliasId) {
                    return true;
                } else {
                    return false;
                }
            })

            setIngredients(filteredIngredients);
        }
    }, [allIngredients]);

    return (
        <>
        { (ingredients.length > 0) && <div className={styles.AddIngredientCard}>
            <header>
                <strong>Add New Ingredient</strong>
            </header>
            <form action="" method="post">
                <label htmlFor={name}>Name:</label>
                <input 
                    type="text" 
                    id={name} 
                    name="name" 
                    placeholder="Name"/><br/>
                <label htmlFor={type}>Type:</label>
                <select id={type} name="type">
                    <optgroup label="Alcohol">
                        <option value="liquor">Liquor</option>
                        <option value="liqueur">Liqueur</option>
                        <option value="other">Other</option>
                        <option value="wine">Wine</option>
                    </optgroup>
                    <optgroup label="Mixer">
                        <option value="carbonated">Carbonated</option>
                        <option value="juice">Juice</option>
                        <option value="mixer">Mixer</option>
                    </optgroup>
                </select><br/>
                <label htmlFor={alias}>Alias:</label>
                <select id={alias} name="alias" defaultValue="0">
                    <option value="0">None</option>
                    <optgroup label="Liquor">
                        { ingredients.filter((ingredient: Item) => ingredient.Type === 'liquor').map((ingredient: Item, index: number) => {
                            return (
                                <option key={index} value={getItemName(ingredient)}>{getItemName(ingredient)}</option>
                                );
                        }) }
                    </optgroup>
                    <optgroup label="Liqueur">
                        { ingredients.filter((ingredient: Item) => ingredient.Type === 'liqueur').map((ingredient: Item, index: number) => {
                            return (
                                <option key={index} value={getItemName(ingredient)}>{getItemName(ingredient)}</option>
                                );
                        }) }
                    </optgroup>
                    <optgroup label="Other">
                        { ingredients.filter((ingredient: Item) => ingredient.Type === 'other').map((ingredient: Item, index: number) => {
                            return (
                                <option key={index} value={getItemName(ingredient)}>{getItemName(ingredient)}</option>
                                );
                        }) }
                    </optgroup>
                    <optgroup label="Wine">
                        { ingredients.filter((ingredient: Item) => ingredient.Type === 'wine').map((ingredient: Item, index: number) => {
                            return (
                                <option key={index} value={getItemName(ingredient)}>{getItemName(ingredient)}</option>
                                );
                        }) }
                    </optgroup>
                    <optgroup label="Carbonated">
                        { ingredients.filter((ingredient: Item) => ingredient.Type === 'carbonated').map((ingredient: Item, index: number) => {
                            return (
                                <option key={index} value={getItemName(ingredient)}>{getItemName(ingredient)}</option>
                                );
                        }) }
                    </optgroup>
                    <optgroup label="Juice">
                        { ingredients.filter((ingredient: Item) => ingredient.Type === 'juice').map((ingredient: Item, index: number) => {
                            return (
                                <option key={index} value={getItemName(ingredient)}>{getItemName(ingredient)}</option>
                                );
                        }) }
                    </optgroup>
                    <optgroup label="Mixer">
                        { ingredients.filter((ingredient: Item) => ingredient.Type === 'mixer').map((ingredient: Item, index: number) => {
                            return (
                                <option key={index} value={getItemName(ingredient)}>{getItemName(ingredient)}</option>
                                );
                        }) }
                    </optgroup>
                </select><br/>
                <label htmlFor={icon}>Icon:</label>
                <input id={icon} type="file" name="icon" accept=".webp"/><br/>
                <input 
                    type="submit" 
                    value="Submit"
                    className={styles.submit}/>
            </form>
        </div> }
        </>
    );
}