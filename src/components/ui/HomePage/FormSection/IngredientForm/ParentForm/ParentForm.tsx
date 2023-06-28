// Component styles
import styles from './ParentForm.module.scss';
// Next components
import Image from 'next/image';
// Type interfaces
import { Item } from '@/types/index';
// Local components
import IngredientFilter from '../IngredientFilter/IngredientFilter';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';
// React components
import { useState, useCallback } from 'react';

export default function ParentForm (props: { ingredient: Item }) {
    const { ingredient } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const [imageSrc, setImageSrc] = useState(`https://img.makedr.ink/i/${getSlug(ingredient.Name)}.webp`);

    const childIngredients = useCallback((item: Item) => {
        const childIngredients: Item[] = [];
        const type = item.Type || '';

        if (storedIngredients.hasOwnProperty(type)) {
            for (const key of Object.keys(storedIngredients[type])) {
                for (const ingredient of storedIngredients[type][key]) {
                    if (ingredient.AliasId === item.Id) {
                    childIngredients.push(ingredient);
                    }
                }
            }
        }

        return childIngredients;
    }, [storedIngredients]);
    
    const ingredientIsChild = useCallback((item: Item) => {
        const type = item.Type || '';
        
        if (storedIngredients.hasOwnProperty(type)) {
            for (const key of Object.keys(storedIngredients[type])) {
                if (storedIngredients[type][key].find((ingredient: Item) => item.AliasId === ingredient.Id)) {
                    return true;
                }
            }
        }

        return false;
    }, [storedIngredients]);

    return (
        <li className={styles.ParentForm}>
            <fieldset>
                <legend>
                    <span>{ingredient.Name}</span>
                    <Image 
                        alt={ingredient.Name} 
                        src={imageSrc} 
                        width="0" 
                        height="48" 
                        onError={() => setImageSrc('https://img.makedr.ink/i/cocktail.webp')} 
                        onLoadingComplete={e => updateWidth(e)} 
                        unoptimized />
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
                    <IngredientFilter 
                        ingredient={ingredient} 
                        showImage={false} />
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