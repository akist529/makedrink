// Component styles
import styles from './RandomDrink.module.scss';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Next components
import Link from 'next/link';
import Image from 'next/image';
// Type imports
import { Drink } from '@/types/index';

export default function RandomDrink (props: { randomDrink: any, getRandomDrink: Function }) {
    const { randomDrink, getRandomDrink } = props;
    const possibleDrinks = useSelector((state: RootState) => state.drinks.possible);
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    function getIngredientFromStore (ingredient: any, index: number) {
        const letter = ingredient.Name.charAt(0);

        // Try to find recipe ingredient
        for (const key of Object.keys(storedIngredients)) {
            if (storedIngredients[key].hasOwnProperty(letter)
                && storedIngredients[key][letter].find((item: any) => item.Name === ingredient.Name)) {
                return (
                    <li key={index} className={styles.ingredient}>
                        <span>{ingredient.Name}</span>
                        <Image alt={ingredient.Name} src={require(`/public/images/ui/${ingredient.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}.webp`)} height="24" />
                    </li>
                );
            }
        }

        // Try to find recipe substitute
        for (const key of Object.keys(storedIngredients)) {
            for (const letter of Object.keys(storedIngredients[key])) {
                if (storedIngredients[key][letter].find((item: any) => item.Name === ingredient.Alias)) {
                    const alias = storedIngredients[key][letter].find((item: any) => item.Name === ingredient.Alias);

                    for (const letter of Object.keys(storedIngredients[key])) {
                        if (storedIngredients[key][letter].find((item: any) => item.AliasId === alias.Id)) {
                            const substitute = storedIngredients[key][letter].find((item: any) => item.AliasId === alias.Id);

                            return (
                                <li key={index}>{substitute.Name}</li>
                            );
                        }
                    }

                    return (
                        <li key={index}>{alias.Name}</li>
                    );
                }
            }
        }
    }

    return (
        <main className={styles.RandomDrink}>
            <header className={styles.drinkName}>{randomDrink['Name']}</header>
            <section>
                <span>Ingredients</span>
                <ul className={styles.ingredients}>
                    { randomDrink['Recipe'].map((ingredient: any, index: number) => {
                        return getIngredientFromStore(ingredient, index)
                    }) }
                </ul>
            </section>
            <figure>
                <Image alt='Cocktail' src={require('/public/images/ui/cocktail-placeholder.jpg')} width="256" />
            </figure>
            <Link href={`/drink/${randomDrink.Name.toLowerCase().replaceAll(' ', '-')}`}>
                <button className={styles.goBtn}>
                    <span>GO TO DRINK</span>
                    <Image alt="Go to Drink" src={require('/public/images/ui/keyboard_double_arrow_right.svg')} width="56" height="56" />
                </button>
            </Link>
            <button onClick={() => getRandomDrink()}>
                <span>GET NEW DRINK</span>
            </button>
        </main>
    )
}