import styles from './FormSection.module.scss';
import IngredientForm from '../IngredientForm/IngredientForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
import Image from 'next/image';

export default function FormSection (props: { drinkType: string }) {
    const { drinkType } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    function findIngredientType(type: string) {
        if (storedIngredients.hasOwnProperty(type)) {
            return true;
        } else {
            return false;
        }
    }

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
                <Link href='/drinks/filtered'>
                    <button className={styles.seeDrinksBtn}>
                    <span>See Drinks</span>
                    <Image 
                        alt='See Drinks' 
                        src={require('/public/images/ui/cocktail.webp')} 
                        width="64" 
                        height="64" />
                    </button>
                </Link> }
        </section>
    );
}