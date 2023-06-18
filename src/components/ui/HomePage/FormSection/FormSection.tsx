// Component styles
import styles from './FormSection.module.scss';
// Local components
import IngredientForm from './IngredientForm/IngredientForm';
import SeeDrinksButton from '@/components/buttons/SeeDrinksButton/SeeDrinksButton';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// React components
import { useCallback } from 'react';

export default function FormSection (props: { drinkType: string }) {
    const { drinkType } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    const findIngredientType = useCallback((type: string) => {
        if (storedIngredients.hasOwnProperty(type)) {
            return true;
        } else {
            return false;
        }
    }, [storedIngredients]);

    return (
        <section id='form' className={styles.FormSection}>
            { Object.keys(storedIngredients).length > 0 && 
                <form>
                    { (drinkType === 'cocktail') && 
                        <>
                            { findIngredientType('liquor') && 
                                <IngredientForm ingredientType='liquor' /> }
                            { findIngredientType('liqueur') && 
                                <IngredientForm ingredientType='liqueur' /> }
                            { findIngredientType('wine') && 
                                <IngredientForm ingredientType='wine' /> }
                            { findIngredientType('other') && 
                                <IngredientForm ingredientType='other' /> }
                        </> }
                    { drinkType && 
                        <>
                            { findIngredientType('carbonated') && 
                                <IngredientForm ingredientType='carbonated' /> }
                            { findIngredientType('juice') && 
                                <IngredientForm ingredientType='juice' /> }
                            { findIngredientType('mixer') && 
                                <IngredientForm ingredientType='mixer' /> }
                        </> }
                </form> }
            { (drinkType && Object.keys(storedIngredients).length > 0) && 
                <SeeDrinksButton /> }
        </section>
    );
}