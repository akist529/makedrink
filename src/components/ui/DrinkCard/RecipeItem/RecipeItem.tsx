// Component styles
import styles from './RecipeItem.module.scss';
// Type interfaces
import { Item } from '@/types/index';
// Next components
import Image from 'next/image';
// Local components
import SubCard from '../SubCard/SubCard';
// React components
import { useState } from 'react';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';
import findItemInStore from '@/helpers/findItemInStore';

export default function RecipeItem (props: { ingredient: Item, isSub: boolean }) {
    const { ingredient, isSub } = props;
    const slug = require(`/public/images/ui/${getSlug(ingredient.Name)}.webp`);
    const [showSubCard, setShowSubCard] = useState(false);
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const itemInStore = findItemInStore(storedIngredients, ingredient.Name);

    function handleClick (e: React.MouseEvent<HTMLButtonElement,MouseEvent>) {
        setShowSubCard(prevState => !prevState);
    }

    return (
        <li className={styles.RecipeItem}>
            { !isSub && itemInStore && <span>{ingredient.Name}</span> }
            { isSub && itemInStore && 
                <div className={styles.altIngredient}>
                    <span>{ingredient.Name}</span>
                    <button onClick={(e) => handleClick(e)}>
                        <Image 
                            alt='Alternate Ingredient' 
                            src={require('/public/images/ui/change_circle.svg')} 
                            width="0" 
                            height="24" 
                            title='Alternate Ingredient' 
                            onLoadingComplete={e => updateWidth(e)} />
                    </button>
                </div> }
            { !itemInStore && 
                <div className={styles.missingIngredient}>
                    <span>{ingredient.Name}</span>
                    <Image 
                        alt='Ingredient Missing' 
                        src={require('/public/images/ui/cancel.svg')} 
                        width="0" 
                        height="24" 
                        title='Ingredient Missing' 
                        onLoadingComplete={e => updateWidth(e)} />
                </div> }
            <Image 
                alt={ingredient.Name} 
                src={slug} 
                width="0" 
                height="24" 
                onLoadingComplete={e => updateWidth(e)} />
            { showSubCard && 
                <SubCard 
                    showSubCard={showSubCard} 
                    setShowSubCard={setShowSubCard}
                    ingredient={ingredient} /> }
        </li>
    );
}