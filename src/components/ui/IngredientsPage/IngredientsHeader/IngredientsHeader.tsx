import styles from './IngredientsHeader.module.scss';
import IngredientsTitle from "../IngredientsTitle/IngredientsTitle";
import SelectAllButton from "@/components/buttons/SelectAllButton/SelectAllButton";
import { useDispatch } from 'react-redux';
import { addIngredient } from '@/store/slices/ingredients.slice';
import { useGetAllIngredientsQuery } from '@/store/api/api';
import { useState, useEffect, useCallback } from 'react';
import { Item } from '@/types/index';

export default function IngredientsHeader () {
    const dispatch = useDispatch();
    const allIngredients = useGetAllIngredientsQuery();
    const [ingredients, setIngredients] = useState([] as Item[]);

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        for (const ingredient of ingredients) {
            dispatch(addIngredient(ingredient));
        }
    }, [dispatch, ingredients]);

    useEffect(() => {
        if (allIngredients.isSuccess) {
            setIngredients(allIngredients.data);
        }
    }, [allIngredients]);

    return (
        <header className={styles.IngredientsHeader}>
            <IngredientsTitle />
            <SelectAllButton 
                clickEvent={handleClick} />
        </header>
    );
}