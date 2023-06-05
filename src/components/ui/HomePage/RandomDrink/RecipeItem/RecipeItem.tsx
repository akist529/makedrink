import styles from './RecipeItem.module.scss';
import { Ingredient, Item } from '@/types/index';
import Image from 'next/image';

export default function RecipeItem (props: { index: number, ingredient: Ingredient | Item, isSub: boolean }) {
    const { index, ingredient, isSub } = props;
    const slug = require(`/public/images/ui/${ingredient.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}.webp`);

    return (
        <li key={index} className={styles.RecipeItem}>
            { !isSub && <span>{ingredient.Name}</span> }
            { isSub && <div className={styles.altIngredient}>
                <span>{ingredient.Name}</span>
                <button>
                    <Image 
                        alt='Alternate Ingredient' 
                        src={require('/public/images/ui/change_circle.svg')} 
                        height="24" 
                        title='Alternate Ingredient' />
                </button>
            </div> }
            <Image 
                alt={ingredient.Name} 
                src={slug} 
                height="24" />
        </li>
    );
}