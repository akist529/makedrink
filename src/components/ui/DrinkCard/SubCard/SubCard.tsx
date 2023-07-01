// Component styles
import styles from './SubCard.module.scss';
// Next components
import Image from 'next/image';
// Type interfaces
import { Item, Ingredient } from '@/types/index';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleSubCard } from '@/store/slices/subCard.slice';
// Local components
import RecipeItem from '../RecipeItem/RecipeItem';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
// React components
import { useMemo } from 'react';

export default function SubCard () {
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const subCardOpen = useSelector((state: RootState) => state.subCard.open);
    const subCardIngredient = useSelector((state: RootState) => state.subCard.ingredient);
    const subCardPreferred = useSelector((state: RootState) => state.subCard.preferred);
    const dispatch = useDispatch();
    
    const altIngredients = useMemo(() => {
        const altIngredients: Item[] = [];

        for (const type of Object.keys(storedIngredients)) {
            for (const key of Object.keys(storedIngredients[type])) {
                for (const item of storedIngredients[type][key]) {
                    if ((item.AliasId) && (item.AliasId === subCardIngredient.AliasId) && (item.Name !== subCardIngredient.Name)) {
                        altIngredients.push(item);
                    } else if (item.Id === subCardIngredient.AliasId) {
                        altIngredients.push(item);
                    }
                }
            }
        }

        return altIngredients;
    }, [storedIngredients, subCardIngredient]);

    return (
        <div data-testid='sub-card'>
        { subCardOpen && 
            <div className={styles.SubCard}>
                <div className={styles.content}>
                    <strong>Prefers {subCardPreferred.Name}.</strong>
                    { altIngredients.length > 0 && <strong>Other Alternatives:</strong> }
                    { altIngredients.length > 0 && <ul className={styles.ingredients}>
                        { altIngredients.map((item: Item, index: number) => {
                            return (
                                <RecipeItem 
                                    key={index} 
                                    ingredient={item} 
                                    preferred={{} as Ingredient} 
                                    isSub={false} />
                            );
                        }) }
                    </ul> }
                    { !altIngredients.length && <strong>No other alternatives</strong> }
                    <button onClick={() => dispatch(toggleSubCard())}>
                        <Image 
                            alt="Close Modal" 
                            src={require('/public/images/ui/close.svg')} 
                            width="0" 
                            height="32" 
                            onLoadingComplete={e => updateWidth(e)} />
                    </button>
                </div>
            </div> }
        </div>
    );
}