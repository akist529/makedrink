// Component styles
import styles from './DrinkSection.module.scss';
// Local components
import DrinkCard from '../../DrinkCard/DrinkCard';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function DrinkSection () {
    const randomDrink = useSelector((state: RootState) => state.drinks.random);

    return (
        <section id='drink' className={styles.DrinkSection}>
          { (Object.keys(randomDrink).length > 0) && 
            <DrinkCard 
              drink={randomDrink} 
              isRandom={true} /> }
        </section>
    );
}