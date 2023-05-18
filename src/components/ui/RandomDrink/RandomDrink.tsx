// Component styles
import styles from './RandomDrink.module.scss'
// Redux components
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
// Next components
import Link from 'next/link'
import Image from 'next/image'

export default function RandomDrink (props: { randomDrink: any }) {
    const { randomDrink } = props;
    const possibleDrinks = useSelector((state: RootState) => state.drinks.possible);
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    const drinksNum = (() => {
        let num = 0;

        for (const key of Object.keys(possibleDrinks)) {
            num += possibleDrinks[key].length;
        }

        return num;
    })();

    function getIngredientFromStore (ingredient: any, index: number) {
        const letter = ingredient.Name.charAt(0);

        // Try to find recipe ingredient
        for (const key of Object.keys(storedIngredients)) {
            if (storedIngredients[key].hasOwnProperty(letter)
                && storedIngredients[key][letter].find((item: any) => item.Name === ingredient.Name)) {
                return (
                    <div key={index} className={styles.ingredient}>
                        <span>{ingredient.Name}</span>
                        <Image alt={ingredient.Name} src={require(`/public/images/ui/${ingredient.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}.webp`)} height="24" />
                    </div>
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
                                <span key={index}>{substitute.Name}</span>
                            );
                        }
                    }

                    return (
                        <span key={index}>{alias.Name}</span>
                    );
                }
            }
        }
    }

    return (
        <div className={styles.RandomDrink}>
            <div className={styles.drinkContent}>
                <strong className={styles.drinkName}>{randomDrink['Name']}</strong>
                <span>Ingredients</span>
                <div className={styles.ingredients}>
                    { randomDrink['Recipe'].map((ingredient: any, index: number) => {
                        return getIngredientFromStore(ingredient, index)
                    }) }
                </div>
                <Image alt='Cocktail' src={require('/public/images/ui/cocktail-placeholder.jpg')} width="256" />
                <Link href={`/drink/${randomDrink.Name.toLowerCase().replaceAll(' ', '-')}`}>
                    <button>
                        <span>GO TO DRINK</span>
                        <Image alt="Go to Drink" src={require('/public/images/ui/keyboard_double_arrow_right.svg')} width="56" height="56" />
                    </button>
                </Link>
            </div>
        </div>
    )
}