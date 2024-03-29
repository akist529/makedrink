// Component styles
import styles from './IngredientsHeader.module.scss';
// Local components
import IngredientsTitle from "../IngredientsTitle/IngredientsTitle";
import SelectAllButton from "@/components/buttons/SelectAllButton/SelectAllButton";
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { addIngredient, removeIngredient } from '@/store/slices/ingredients.slice';
import { useGetAllIngredientsQuery } from '@/store/api/api';
import { RootState } from '@/store/store';
// React components
import { useCallback, useMemo } from 'react';
// Type interfaces
import { Item } from '@/types/index';

export default function IngredientsHeader () {
    const dispatch = useDispatch();
    const allIngredients = useGetAllIngredientsQuery();
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    const ingredients = useMemo(() => {
        if (allIngredients.isSuccess) {
            return allIngredients.data;
        } else return [];
    }, [allIngredients]);

    const addAllIngredients = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        for (const ingredient of ingredients) {
            dispatch(addIngredient(ingredient));
        }
    }, [dispatch, ingredients]);

    const removeAllIngredients = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        for (const ingredient of ingredients) {
            dispatch(removeIngredient(ingredient));
        }
    }, [dispatch, ingredients]);

    const allIngredientsStored = useMemo(() => {
        return ingredients.every((item: Item) => {
            if (item.Type && storedIngredients.hasOwnProperty(item.Type)) {
                for (const key of Object.keys(storedIngredients[item.Type])) {
                    const storedItem = storedIngredients[item.Type][key].find((storedItem: Item) => item.Id === storedItem.Id);

                    if (storedItem) return true;
                }
            }
        });
    }, [ingredients, storedIngredients]);

    return (
        <header className={styles.IngredientsHeader}>
            <IngredientsTitle />
            <div className={styles.selectAll}>
                <strong>Select All Ingredients</strong>
                <SelectAllButton 
                    clickEvent={allIngredientsStored ? removeAllIngredients : addAllIngredients} 
                    ingredients={ingredients} />
            </div>
        </header>
    );
}