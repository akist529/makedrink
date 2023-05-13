import styles from './RecipeItem.module.scss';
import Image from 'next/image';

export default function RecipeItem (props: { ingredient: any, missing: boolean }) {
    const { ingredient, missing } = props;
    
    return (
        <li className={styles.RecipeItem}>
            { missing && <div className={styles.missing}>
                <span>{ingredient.Alias ? ingredient.Alias : ingredient.Name}</span>
                <span>{`${ingredient.Amount} ${ingredient.Unit}`}</span>
            </div> }
            { !missing && <div>
                <span>{ingredient.Name}</span>
                <span>{`${ingredient.Amount} ${ingredient.Unit}`}</span>
            </div> }
            { missing && <Image 
                alt='Ingredient Missing'
                src={require('public/images/ui/cancel.svg')}
                width="24"
                height="24"
                title="Missing Ingredient"
            /> }
        </li>
    );
}