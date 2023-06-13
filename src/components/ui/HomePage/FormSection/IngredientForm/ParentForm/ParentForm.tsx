// Component styles
import styles from './ParentForm.module.scss';
// Next components
import Image from 'next/image';
// Type interfaces
import { Item, IngredientDict } from '@/types/index';
// Local components
import IngredientFilter from '../IngredientFilter/IngredientFilter';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';

export default function ParentForm (props: { ingredient: Item }) {
    const { ingredient } = props;
    const storedIngredients: IngredientDict = useSelector((state: RootState) => state.ingredients.stored);
    const slug = require(`/public/images/ui/${getSlug(ingredient.Name)}.webp`);

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

    return (
        <li className={styles.ParentForm}>
            <fieldset>
                <legend>
                    <span>{ingredient.Name}</span>
                    <Image 
                        alt={ingredient.Name} 
                        src={slug} 
                        width="0" 
                        height="48" 
                        onLoadingComplete={e => updateWidth(e)} />
                </legend>
                <ul className={styles.ingredientList}>
                    { childIngredients(ingredient).filter((ingredient: Item) => ingredientIsChild(ingredient)).map((ingredient: Item, index: number) => {
                        return (
                            <IngredientFilter 
                                key={index} 
                                ingredient={ingredient} 
                                showImage={false} />
                        );
                    }) }
                </ul>
                <ul className={styles.ingredientList}>
                    { childIngredients(ingredient).filter((ingredient: Item) => !ingredientIsChild(ingredient)).map((ingredient: Item, index: number) => {
                        return (
                            <IngredientFilter 
                                key={index} 
                                ingredient={ingredient} 
                                showImage={false} />
                        );
                    }) }
                </ul>
            </fieldset>
        </li>
    );
}