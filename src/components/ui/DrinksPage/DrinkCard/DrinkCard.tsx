// Type interfaces
import { DrinkInfo, Ingredient } from '@/types/index';

export default function DrinkCard (props: { drink: DrinkInfo }) {
    const { drink } = props;

    return (
        <article>
            <h2>{drink.Name}</h2>
            <ul>
                { drink.Recipe.map((item: Ingredient, index: number) => {
                    return (
                        <li key={index}>
                            <span>{item.Name}</span>
                        </li>
                    );
                }) }
            </ul>
        </article>
    );
}