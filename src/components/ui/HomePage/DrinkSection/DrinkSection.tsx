import styles from './DrinkSection.module.scss';
import DrinkCard from '../../DrinkCard/DrinkCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function DrinkSection (props: { getRandomDrink: Function }) {
    const randomDrink = useSelector((state: RootState) => state.drinks.random);
    const { getRandomDrink } = props;

    return (
        <section id='drink' className={styles.DrinkSection}>
          { (Object.keys(randomDrink).length > 0) && 
            <DrinkCard 
              drink={randomDrink} 
              isRandom={true} /> }
        </section>
    );
}