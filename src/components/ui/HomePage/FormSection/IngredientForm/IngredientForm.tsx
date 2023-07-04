// Component styles
import styles from './IngredientForm.module.scss';
// React components
import { useState, useMemo, useCallback } from 'react';
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
// Helper functions
import notNullish from '@/helpers/notNullish';

export default function IngredientForm (props: { formType: string }) {
    const { formType } = props;

    // RTK Query
    const allIngredients = useGetAllIngredientsQuery();
    // Redux store state
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    // React local states
    const [formOpen, setFormOpen] = useState(true);

    const ingredients = useMemo(() => {
        if (allIngredients.isSuccess) {
            return allIngredients.data;
        } else return [];
    }, [allIngredients]);

    const ingredientIsParent = useCallback((item: Item) => {
        const altItem = ingredients.find((ingredient: Item) => ingredient.AliasId === item.Id);
        if (altItem) return true;
            else return false;
    }, [ingredients]);

    const parentIngredients = useMemo(() => {
        return ingredients.filter((ingredient: Item) => {
            const type = ingredient.Type;

            if (type !== formType) return false;
            if (!ingredientIsParent(ingredient)) return false;

            if (notNullish(storedIngredients, type)) {
                for (const key of Object.keys(storedIngredients[type])) {
                    const items = storedIngredients[type][key];
                    const foundItem = items.find((item: Item) => item.Id === ingredient.Id);
                    if (foundItem) return true;
                    const foundAlias = items.find((item: Item) => item.AliasId == ingredient.Id);
                    if (foundAlias) return true;    
                }
            } return false;
        });
    }, [ingredients, ingredientIsParent, storedIngredients, formType]);

    const loneIngredients = useMemo(() => {
        const loneItems = [] as Item[];

        for (const key of Object.keys(storedIngredients[formType])) {
            const items = storedIngredients[formType][key].filter((item: Item) => {
                if (!item.AliasId && !ingredientIsParent(item)) return true;
            });

            for (const item of items) loneItems.push(item);
        }

        return loneItems;
    }, [storedIngredients, formType, ingredientIsParent]);

    const formStyles = useMemo(() => {
        if (formOpen) return [styles.gradient, styles.gradientOpen].join(' ');
            else return [styles.gradient, styles.gradientClosed].join(' ');
    }, [formOpen]);

    return (
        <fieldset data-testid='ingredient-form' className={formOpen ? [styles.IngredientForm, styles.formOpen].join(' ') : styles.IngredientForm}>
            <FormLegend 
                ingredientType={formType} 
                setFormOpen={setFormOpen} />
            <ul className={formStyles}>
            { parentIngredients.map((ingredient: Item, index: number) => {
                return (
                    <ParentForm 
                        key={index} 
                        parent={ingredient} />
                );
            }) }
                <li>
                    <ul className={styles.ingredientList}>
                    { loneIngredients.map((ingredient: Item, index: number) => {
                        return (
                            <IngredientFilter 
                                key={index} 
                                ingredient={ingredient} 
                                showImage={true} />
                        );
                    }) }
                    </ul>
                </li>
            </ul>
        </fieldset>
    );
}