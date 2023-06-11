import styles from './RecipeItem.module.scss';
import { Item } from '@/types/index';
import Image from 'next/image';
import SubCard from '../SubCard/SubCard';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function RecipeItem (props: { ingredient: Item, isSub: boolean }) {
    const { ingredient, isSub } = props;
    const slug = require(`/public/images/ui/${ingredient.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}.webp`);
    const [showSubCard, setShowSubCard] = useState(false);
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    function handleClick (e: any) {
        for (const key of Object.keys(storedIngredients[ingredient.Type])) {
            if (storedIngredients[ingredient.Type][key].find((item: Item) => (item.AliasId === ingredient.AliasId) && (item.Name !== ingredient.Name))) {
                setShowSubCard(prevState => !prevState);
                return;
            }
        }
    }

    function updateWidth (e: HTMLImageElement) {
        e.width = (e.height / e.naturalHeight) * e.naturalWidth;
    }

    return (
        <li className={styles.RecipeItem}>
            { !isSub && <span>{ingredient.Name}</span> }
            { isSub && <div className={styles.altIngredient}>
                <span>{ingredient.Name}</span>
                <button onClick={(e) => handleClick(e)}>
                    <Image 
                        alt='Alternate Ingredient' 
                        src={require('/public/images/ui/change_circle.svg')} 
                        height="24" 
                        title='Alternate Ingredient'
                        onLoadingComplete={e => updateWidth(e)} />
                </button>
            </div> }
            <Image 
                alt={ingredient.Name} 
                src={slug} 
                height="24" />
            { showSubCard && 
                <SubCard 
                    showSubCard={showSubCard} 
                    setShowSubCard={setShowSubCard}
                    ingredient={ingredient} /> }
        </li>
    );
}