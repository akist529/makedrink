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
                    <span key={index}>{ingredient.Name}</span>
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
        <div>
            <span>{drinksNum} drink{drinksNum > 1 && 's'} found!</span>
            <div className={styles.RandomDrink}>
                <span>{randomDrink['Name']}</span>
                <span>DRINK IMAGE</span>
                { randomDrink['Recipe'].map((ingredient: any, index: number) => {
                    return getIngredientFromStore(ingredient, index)
                }) }
                <Image alt='Cocktail' src={require('/public/images/ui/cocktail-placeholder.jpg')} width="256" />
                <Link href={`/drink/${randomDrink.Name.toLowerCase().replaceAll(' ', '-')}`}>
                    <button>
                        <span>GO TO DRINK</span>
                        <Image alt="Go to Drink" src={require('/public/images/ui/local_bar.svg')} width="16" height="16" />
                    </button>
                </Link>
            </div>
        </div>
    )
}