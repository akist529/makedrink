// Component styles
import styles from './SubCard.module.scss';
// Next components
import Image from 'next/image';
// Type interfaces
import { Item } from '@/types/index';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleSubCard } from '@/store/slices/subCard.slice';
// Local components
import RecipeItem from '../RecipeItem/RecipeItem';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getItemName from '@/helpers/getItemName';

export default function SubCard () {
    const imagePath = require('/public/images/ui/close.svg');
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const subCardOpen = useSelector((state: RootState) => state.subCard.open);
    const subCardIngredient = useSelector((state: RootState) => state.subCard.ingredient);
    const dispatch = useDispatch();
    
    const altIngredients = (() => {
        const altIngredients: Item[] = [];

        for (const type of Object.keys(storedIngredients)) {
            for (const key of Object.keys(storedIngredients[type])) {
                for (const item of storedIngredients[type][key]) {
                    if ((item.AliasId === subCardIngredient.AliasId) && (item.Name !== subCardIngredient.Name)) {
                        altIngredients.push(item);
                    }
                }
            }
        }

        return altIngredients;
    })();

    return (
        <>
            { subCardOpen && 
                <div className={styles.SubCard}>
                    <div className={styles.content}>
                        { altIngredients.length > 0 && <strong>Other Alternatives:</strong> }
                        { altIngredients.length > 0 && <ul className={styles.ingredients}>
                            { altIngredients.map((item: Item, index: number) => {
                                return (
                                    <RecipeItem 
                                        key={index} 
                                        ingredient={item} 
                                        isSub={false} />
                                );
                            }) }
                        </ul> }
                        { !altIngredients.length && <strong>No other alternatives</strong> }
                        <button onClick={() => dispatch(toggleSubCard())}>
                            <Image 
                                alt="Close Modal" 
                                src={imagePath} 
                                width="0" 
                                height="32" 
                                onLoadingComplete={e => updateWidth(e)} />
                        </button>
                    </div>
                </div> }
        </>
    );
}