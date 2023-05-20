// Page styles
import styles from '@/styles/Drinks.module.scss';
// Next components
import type { NextPage } from 'next';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Local components
import DrinkCard from '@/components/ui/DrinksPage/DrinkCard/DrinkCard';
// Type interfaces
import { DrinkInfo } from '@/types/index';

const DrinksPage: NextPage = () => {
    const possibleDrinks = useSelector((state: RootState) => state.drinks.possible);

    function getDrinksByKey(key: string) {

    }

    return (
        <main className={styles.DrinksPage}>
            <section>
                <ul>
                    { Object.keys(possibleDrinks).map((key: string, index: number) => {
                        return possibleDrinks[key].map((drink: DrinkInfo, index: number) => {
                            return <DrinkCard drink={drink} key={index} />
                        })
                    }) }
                </ul>
            </section>
        </main>
    );
}

export default DrinksPage;