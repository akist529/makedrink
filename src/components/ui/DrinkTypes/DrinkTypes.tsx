// Page styles
import styles from './DrinkTypes.module.scss';
// Next components
import Image from 'next/image';

export default function DrinkTypes (props: { drinkType: string, setDrinkType: Function }) {
    const { drinkType, setDrinkType } = props;

    return (
    <div className={styles.DrinkTypes}>
        <button className={drinkType === 'cocktail' ? styles.active : ''} onClick={() => setDrinkType('cocktail')}>
            <span>Cocktail</span>
            <Image alt="Cocktail" src={require('/public/images/ui/local_bar.svg')} width="24" height="24" />
        </button>
        <button className={drinkType === 'mocktail' ? styles.active : ''} onClick={() => setDrinkType('mocktail')}>
            <span>Mocktail</span>
            <Image alt="Mocktail" src={require('/public/images/ui/no_drinks.svg')} width="24" height="24" />
        </button>
    </div>
    )
}