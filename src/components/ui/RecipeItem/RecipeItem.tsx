import styles from './RecipeItem.module.scss';
import Image from 'next/image';

export default function RecipeItem (props: { ingredient: any, missing: boolean }) {
    const { ingredient, missing } = props;
    const filename = ingredient.Name.split(' ').join('-').toLowerCase().replaceAll('/', '-');
    
    return (
        <li className={styles.RecipeItem}>
            { missing && 
                <div className={styles.missing}>
                    <span>{ingredient.Alias ? ingredient.Alias : ingredient.Name}</span>
                    <span>{`${ingredient.Amount} ${ingredient.Unit}`}</span>
                </div> }
            { !missing && 
                <div>
                    <Image alt={ingredient.Name} src={require(`/public/images/ui/${filename}.webp`)} height="32" />
                    <span>{ingredient.Name}</span>
                    <span>{`${ingredient.Amount} ${ingredient.Unit}`}{(ingredient.Amount > 1 && ingredient.Unit[ingredient.Unit.length - 1] !== 's') && 's'}</span>
                </div> }
            { missing && 
                <Image 
                    alt='Ingredient Missing'
                    src={require('public/images/ui/cancel.svg')}
                    width="24"
                    height="24"
                    title="Missing Ingredient"
                /> }
        </li>
    );
}