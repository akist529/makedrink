// Component styles
import styles from './IngredientResult.module.scss';
// Type interfaces
import { Item } from '@/types/index';
// Local components
import Ingredient from '@/components/ui/IngredientsPage/Ingredient/Ingredient';
import IngredientCheckbox from '@/components/inputs/IngredientCheckbox/IngredientCheckbox';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Helper functions
import findItemInStore from '@/helpers/findItemInStore';
import getItemName from '@/helpers/getItemName';
import getSlug from '@/helpers/getSlug';
import updateWidth from '@/helpers/updateWidth';
// Next components
import Image from 'next/image';
// React components
import { useState, useMemo } from 'react';

export default function SearchResult (props: { ingredient: Item }) {
    const { ingredient } = props;

    // Redux state
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    
    const inStore = useMemo(() => {
        if (findItemInStore(storedIngredients, ingredient.Name)) {
            return true;
        } else {
            return false;
        }
    }, [ingredient.Name, storedIngredients]);
    const displayName = useMemo(() => getItemName(ingredient), [ingredient]);
    const slug = useMemo(() => getSlug(ingredient.Name), [ingredient.Name]);

    return (
        <div className={styles.IngredientResult}>
            <Ingredient 
                item={ingredient} 
                section={[]} />
        </div>
    );
}