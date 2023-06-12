// Component styles
import styles from './SubCard.module.scss';
// Next components
import Image from 'next/image';
// Type interfaces
import { Item } from '@/types/index';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Local components
import RecipeItem from '../RecipeItem/RecipeItem';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function SubCard (props: { showSubCard: boolean, setShowSubCard: Function, ingredient: Item }) {
    const { showSubCard, setShowSubCard, ingredient } = props;
    const imagePath = require('/public/images/ui/close.svg');
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    function getAltIngredients () {
        const altIngredients: Item[] = [];

        for (const type of Object.keys(storedIngredients)) {
            for (const key of Object.keys(storedIngredients[type])) {
                for (const item of storedIngredients[type][key]) {
                    if ((item.AliasId === ingredient.AliasId) && (item.Name !== ingredient.Name)) {
                        altIngredients.push(item);
                    }
                }
            }
        }

        return altIngredients;
    }

    return (
        <div className={styles.SubCard}>
            <strong>Other Alternatives:</strong>
            <ul className={styles.ingredients}>
                { getAltIngredients().map((item: Item, index: number) => {
                    return (
                        <RecipeItem 
                            key={index} 
                            ingredient={item} 
                            isSub={false} />
                    );
                }) }
            </ul>
            <button onClick={() => setShowSubCard(false)}>
                <Image 
                    alt="Close Modal" 
                    src={imagePath} 
                    width="0" 
                    height="32" 
                    onLoadingComplete={e => updateWidth(e)} />
            </button>
        </div>
    );
}