// Component styles
import styles from './FormSection.module.scss';
// Local components
import IngredientForm from './IngredientForm/IngredientForm';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// React components
import { useCallback } from 'react';
// Next components
import Link from 'next/link';
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

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
        <section data-testid='form-section' id='form' className={styles.FormSection}>
            { Object.keys(storedIngredients).length > 0 && 
                <form>
                    { (drinkType === 'cocktail') && 
                        <>
                            { findIngredientType('liquor') && 
                                <IngredientForm 
                                    ingredientType='liquor' /> }
                            { findIngredientType('liqueur') && 
                                <IngredientForm 
                                    ingredientType='liqueur' /> }
                            { findIngredientType('wine') && 
                                <IngredientForm 
                                    ingredientType='wine' /> }
                            { findIngredientType('other') && 
                                <IngredientForm 
                                    ingredientType='other' /> }
                        </> }
                    { drinkType && 
                        <>
                            { findIngredientType('carbonated') && 
                                <IngredientForm 
                                    ingredientType='carbonated' /> }
                            { findIngredientType('juice') && 
                                <IngredientForm 
                                    ingredientType='juice' /> }
                            { findIngredientType('mixer') && 
                                <IngredientForm 
                                    ingredientType='mixer' /> }
                        </> }
                </form> }
            { (drinkType && Object.keys(storedIngredients).length > 0) && 
                <Link href='/drinks/filtered' className={styles.seeDrinks}>
                    <span>See Drinks</span>
                    <Image 
                        alt='See Drinks' 
                        src='https://img.makedr.ink/i/cocktail.webp' 
                        width="0" 
                        height="64" 
                        onLoadingComplete={e => updateWidth(e)} 
                        unoptimized />
                </Link> }
        </section>
    );
}