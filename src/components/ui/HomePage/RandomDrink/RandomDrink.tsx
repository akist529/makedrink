// Component styles
import styles from './RandomDrink.module.scss';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Next components
import Link from 'next/link';
import Image from 'next/image';
// Type imports
import { DrinkInfo, Item, Ingredient } from '@/types/index';

export default function RandomDrink (props: { randomDrink: DrinkInfo, getRandomDrink: Function }) {
    const { randomDrink, getRandomDrink } = props;
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    function getIngredientFromStore (ingredient: Ingredient, index: number) {
        const letter = ingredient.Name.charAt(0);

        // Try to find recipe ingredient
        for (const key of Object.keys(storedIngredients)) {
            if (storedIngredients[key].hasOwnProperty(letter)
                && storedIngredients[key][letter].find((item: Item) => item.Name === ingredient.Name)) {
                return (
                    <li key={index} className={styles.ingredient}>
                        <span>{ingredient.Name}</span>
                        <Image 
                            alt={ingredient.Name} 
                            src={require(`/public/images/ui/${ingredient.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}.webp`)} 
                            height="24" />
                    </li>
                );
            }
        }

        // Try to find recipe substitute
        for (const key of Object.keys(storedIngredients)) {
            for (const letter of Object.keys(storedIngredients[key])) {
                if (storedIngredients[key][letter].find((item: Item) => item.Name === ingredient.Alias)) {
                    const alias = storedIngredients[key][letter].find((item: Item) => item.Name === ingredient.Alias);

                    if (alias) {
                        for (const letter of Object.keys(storedIngredients[key])) {
                            if (storedIngredients[key][letter].find((item: Item) => item.AliasId === alias.Id)) {
                                const substitute = storedIngredients[key][letter].find((item: Item) => item.AliasId === alias.Id);
    
                                if (substitute) {
                                    return (
                                        <li key={index} className={styles.ingredient}>
                                        <span>{substitute.Name}</span>
                                        <Image 
                                            alt={substitute.Name} 
                                            src={require(`/public/images/ui/${substitute.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}.webp`)} 
                                            height="24" />
                                    </li>
                                    );
                                }
                            }
                        }
                    }

                    if (alias) {
                        return (
                            <li key={index}>{alias.Name}</li>
                        );
                    }
                }
            }
        }
    }

    function updateWidth (e: HTMLImageElement) {
        e.width = (e.height / e.naturalHeight) * e.naturalWidth;
    }

    function slug (item: DrinkInfo) {
        return `${item.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}`;
    }

    return (
        <main className={styles.RandomDrink}>
            <header className={styles.drinkName}>{randomDrink['Name']}</header>
            <section>
                <span>Ingredients</span>
                <ul className={styles.ingredients}>
                    { randomDrink['Recipe'].map((ingredient: Ingredient, index: number) => {
                        return getIngredientFromStore(ingredient, index);
                    }) }
                </ul>
            </section>
            <figure>
                <Image 
                    alt='Cocktail' 
                    src={require('/public/images/ui/cocktail-placeholder.jpg')} 
                    height="224" 
                    onLoadingComplete={e => updateWidth(e)} />
            </figure>
            <Link href={`/drink/${slug(randomDrink)}`}>
                <button className={styles.goBtn}>
                    <span>GO TO DRINK</span>
                    <Image 
                        alt="Go to Drink" 
                        src={require('/public/images/ui/keyboard_double_arrow_right.svg')} 
                        width="56" 
                        height="56" />
                </button>
            </Link>
            <button onClick={() => getRandomDrink()}>
                <span>GET NEW DRINK</span>
            </button>
        </main>
    );
}