// Component styles
import styles from './FormSection.module.scss';
// Local components
import IngredientForm from './IngredientForm/IngredientForm';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// React components
import { useMemo } from 'react';
// Next components
import Link from 'next/link';
// Helper functions
import notNullish from '@/helpers/notNullish';

export default function FormSection (props: { drinkType: string }) {
    const { drinkType } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    const alcohol = useMemo(() => {
        return {
            ...notNullish(storedIngredients, 'liquor') && {liquor: storedIngredients.liquor},
            ...notNullish(storedIngredients, 'liqueur') && {liqueur: storedIngredients.liqueur},
            ...notNullish(storedIngredients, 'other') && {other: storedIngredients.other},
            ...notNullish(storedIngredients, 'wine') && {wine: storedIngredients.wine},
        }
    }, [storedIngredients]);

    const mixers = useMemo(() => {
        return {
            ...notNullish(storedIngredients, 'carbonated') && {carbonated: storedIngredients.carbonated},
            ...notNullish(storedIngredients, 'juice') && {juice: storedIngredients.juice},
            ...notNullish(storedIngredients, 'mixer') && {mixer: storedIngredients.mixer},
        }
    }, [storedIngredients]);

    const showButton = useMemo(() => {
        return drinkType && Object.keys(storedIngredients).length > 0;
    }, [drinkType, storedIngredients]);

    return (
        <section data-testid='form-section' id='form' className={styles.FormSection}>
        { Object.keys(storedIngredients).length > 0 && 
            <form>
            { drinkType === 'cocktail' && 
                Object.keys(alcohol).map((type: string, index: number) => {
                    return <IngredientForm key={index} formType={type} />
                }) }
            { drinkType && 
                Object.keys(mixers).map((type: string, index: number) => {
                    return <IngredientForm key={index} formType={type} />
                }) }
            </form> }
        { showButton && 
            <Link
                href='/drinks/filtered'
                className={styles.seeDrinks}
            >See Drinks</Link> }
        </section>
    );
}