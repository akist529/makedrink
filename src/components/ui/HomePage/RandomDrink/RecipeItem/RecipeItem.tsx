import styles from './RecipeItem.module.scss';
import { Ingredient, Item } from '@/types/index';
import Image from 'next/image';
import SubCard from '../SubCard/SubCard';
import { useState, useEffect } from 'react';

export default function RecipeItem (props: { index: number, ingredient: Ingredient | Item, isSub: boolean }) {
    const { index, ingredient, isSub } = props;
    const slug = require(`/public/images/ui/${ingredient.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}.webp`);
    const [showSubCard, setShowSubCard] = useState(false);
    const [screenX, setScreenX] = useState(0);
    const [screenY, setScreenY] = useState(0);

    function handleClick (e: any) {
        setScreenX(e.screenX);
        setScreenY(e.screenY);
        setShowSubCard(prevState => !prevState);
    }

    useEffect(() => {
        console.log(screenX, screenY);
    }, [screenX, screenY]);

    return (
        <li key={index} className={styles.RecipeItem}>
            { !isSub && <span>{ingredient.Name}</span> }
            { isSub && <div className={styles.altIngredient}>
                <span>{ingredient.Name}</span>
                <button onClick={(e) => handleClick(e)}>
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
            { showSubCard && 
                <SubCard 
                    screenX={screenX} 
                    screenY={screenY} 
                    showSubCard={showSubCard} 
                    setShowSubCard={setShowSubCard} /> }
        </li>
    );
}