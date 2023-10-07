// Component styles
import styles from './ParentForm.module.scss';
// Type interfaces
import { Item } from '@/types/index';
// Local components
import IngredientFilter from '../IngredientFilter/IngredientFilter';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Helper functions
import getSlug from '@/helpers/getSlug';
import notNullish from '@/helpers/notNullish';
// React components
import { useState, useMemo, useCallback } from 'react';

export default function ParentForm (props: { parent: Item }) {
    const { parent } = props;

    // Redux store state
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    // React local state
    const [imageSrc, setImageSrc] = useState(`https://img.makedr.ink/i/${getSlug(parent.Name)}.webp`);

    const childIngredients = useMemo(() => {
        const childIngredients: Item[] = [];
        const type = parent.Type || '';

        if (notNullish(storedIngredients, type)) {
            for (const key of Object.keys(storedIngredients[type])) {
                const items = storedIngredients[type][key];
                
                items.forEach((ingredient: Item) => {
                    if (ingredient.AliasId === parent.Id) {
                        childIngredients.push(ingredient);
                    }
                });
            }
        }

        return childIngredients;
    }, [storedIngredients, parent]);
    
    const parentInStore = useMemo(() => {
        const type = parent.Type || '';
        const key = parent.Name[0];

        if (notNullish(storedIngredients, type) && notNullish(storedIngredients[type], key)) {
            const items = storedIngredients[type][key];
            const foundParent = items.find((item: Item) => item.Id === parent.Id);
            if (foundParent) return true;
        }
    }, [parent, storedIngredients]);

    const iconExists = useCallback((url: string) => {
        const image = new Image();
        image.src = url;

        if (image.complete) {
            return true;
        } else {
            image.onload = () => {
                return true;
            }

            image.onerror = () => {
                return false;
            }
        }
    }, []);

    return (
        <li className={styles.ParentForm}>
            <fieldset>
                <legend>
                    <span>{parent.Name}</span>
                    <span
                        className={styles.icon}
                        style={{backgroundImage: `url(${iconExists(imageSrc) ? imageSrc : 'https://img.makedr.ink/i/cocktail.webp'})`}}
                    ></span>
                </legend>
                <ul className={styles.ingredientList}>
                { childIngredients.map((ingredient: Item, index: number) => {
                    return (
                        <IngredientFilter 
                            key={index} 
                            ingredient={ingredient} 
                            showImage={false} />
                    );
                }) }
                { parentInStore && 
                    <IngredientFilter 
                        ingredient={parent} 
                        showImage={false} /> }
                </ul>
            </fieldset>
        </li>
    );
}