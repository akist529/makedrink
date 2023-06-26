// Component styles
import styles from './IngredientForm.module.scss';
// React components
import { useState, useEffect, useCallback } from 'react';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetAllIngredientsQuery } from '@/store/api/api';
// Local components
import IngredientFilter from '@/components/ui/HomePage/FormSection/IngredientForm/IngredientFilter/IngredientFilter';
import FormLegend from './FormLegend/FormLegend';
import ParentForm from './ParentForm/ParentForm';
// Type interfaces
import { Item } from '@/types/index';

export default function IngredientForm (props: { ingredientType: string }) {
    const { ingredientType } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const [formOpen, setFormOpen] = useState(true);

    const [ingredients, setIngredients] = useState([] as Item[]);
    const allIngredients = useGetAllIngredientsQuery();

    useEffect(() => {
        if (allIngredients.isSuccess) {
            setIngredients(allIngredients.data);
        }
    }, [allIngredients, ingredients]);

    const getIngredients = useCallback((type: string) => {
        const filteredIngredients: Item[] = [];

        if (storedIngredients.hasOwnProperty(type)) {
            for (const key of Object.keys(storedIngredients[type])) {
                for (const ingredient of storedIngredients[type][key]) {
                    filteredIngredients.push(ingredient);
                }
            }
        }

        return filteredIngredients;
    }, [storedIngredients]);

    const ingredientIsParent = useCallback((item: Item) => {
        const altItem = ingredients.find((ingredient: Item) => ingredient.AliasId === item.Id);

        if (altItem) {
            return true;
        } else {
            return false;
        }
    }, [ingredients]);

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
        <fieldset className={formOpen ? [styles.IngredientForm, styles.formOpen].join(' ') : styles.IngredientForm}>
            <FormLegend 
                ingredientType={ingredientType} 
                setFormOpen={setFormOpen} />
            { (ingredients.length > 0) && <ul className={formOpen ? [styles.gradient, styles.gradientOpen].join(' ') : [styles.gradient, styles.gradientClosed].join(' ')}>
                { getIngredients(ingredientType).filter((ingredient: Item) => ingredientIsParent(ingredient)).map((ingredient: Item, index: number) => {
                    return (
                        <ParentForm 
                            key={index} 
                            ingredient={ingredient} />
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
            </ul> }
        </fieldset>
    );
}