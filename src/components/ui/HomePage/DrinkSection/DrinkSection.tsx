import styles from './DrinkSection.module.scss';
import { DrinkInfo } from '@/types/index';
import RandomDrink from './RandomDrink/RandomDrink';

export default function DrinkSection (props: { randomDrink: DrinkInfo, getRandomDrink: Function }) {
    const { randomDrink, getRandomDrink } = props;

    return (
        <section id='drink' className={styles.DrinkSection}>
          { (Object.keys(randomDrink).length > 0) && 
            <RandomDrink 
              randomDrink={randomDrink} 
              getRandomDrink={getRandomDrink} /> }
        </section>
    );
}