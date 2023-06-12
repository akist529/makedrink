// Component styles
import styles from './DrinkTypes.module.scss';
// Next components
import Image from 'next/image';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function DrinkTypes (props: { drinkType: string, setDrinkType: Function, drinkError: string, setDrinkError: Function }) {
    const { drinkType, setDrinkType, drinkError, setDrinkError } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    function handleClick (type: string) {
        if (Object.keys(storedIngredients).length > 0) {
            setDrinkType(type);
        } else {
            setDrinkError('You don\'t have enough ingredients to make a drink');
        }
    }

    return (
    <div className={styles.DrinkTypes}>
        <button className={drinkType === 'cocktail' ? styles.active : ''} onClick={() => handleClick('cocktail')}>
            <span>Cocktail</span>
            <Image 
                alt="Cocktail" 
                src={require('/public/images/ui/local_bar.svg')} 
                width="0" 
                height="24" 
                onLoadingComplete={e => updateWidth(e)} />
        </button>
        <button className={drinkType === 'mocktail' ? styles.active : ''} onClick={() => handleClick('mocktail')}>
            <span>Mocktail</span>
            <Image 
                alt="Mocktail" 
                src={require('/public/images/ui/no_drinks.svg')} 
                width="0" 
                height="24" 
                onLoadingComplete={e => updateWidth(e)} />
        </button>
    </div>
    );
}