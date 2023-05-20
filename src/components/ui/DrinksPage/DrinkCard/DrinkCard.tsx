// Type interfaces
import { DrinkInfo } from '@/types/index';

export default function DrinkCard (props: { drink: DrinkInfo }) {
    const { drink } = props;

    return (
        <article>
            <h1>{drink.Name}</h1>
        </article>
    );
}