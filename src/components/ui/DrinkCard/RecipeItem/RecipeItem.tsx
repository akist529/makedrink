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

export default function RecipeItem (props: { ingredient: any, isSub: boolean }) {
    const { ingredient, isSub } = props;
    const slug = require(`/public/images/ui/${ingredient.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}.webp`);
    const [showSubCard, setShowSubCard] = useState(false);
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    function handleClick (e: any) {
        if (Object.keys(ingredient).includes('Type')) {
            for (const key of Object.keys(storedIngredients[ingredient.Type])) {
                if (storedIngredients[ingredient.Type][key].find((item: Item) => (item.AliasId === ingredient.AliasId) && (item.Name !== ingredient.Name))) {
                    setShowSubCard(prevState => !prevState);
                    return;
                }
            }    
        }
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
                        width="0" 
                        height="24" 
                        title='Alternate Ingredient' 
                        onLoadingComplete={e => updateWidth(e)} />
                </button>
            </div> }
            <Image 
                alt={ingredient.Name} 
                src={slug} 
                width="0" 
                height="24" />
            { showSubCard && 
                <SubCard 
                    showSubCard={showSubCard} 
                    setShowSubCard={setShowSubCard}
                    ingredient={ingredient} /> }
        </li>
    );
}