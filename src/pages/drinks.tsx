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
import { DrinkDict, DrinkInfo } from '@/types/index';

const DrinksPage: NextPage = () => {
    const possibleDrinks: DrinkDict = useSelector((state: RootState) => state.drinks.possible);

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