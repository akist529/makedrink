// Component styles
import styles from './IngredientsSection.module.scss';
// React components
import { useState, useCallback, useMemo } from 'react';
// Helper functions
import allIngredientsStored from '@/helpers/allIngredientsStored';
// Local components
import IngredientCategory from '@/components/ui/IngredientsPage/IngredientCategory/IngredientCategory';
import IngredientList from './IngredientList/IngredientList';
import SelectAllButton from '@/components/buttons/SelectAllButton/SelectAllButton';
// Type interfaces
import { Item } from '@/types/index';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { addIngredient, removeIngredient } from '@/store/slices/ingredients.slice';
import { RootState } from '@/store/store';

export default function IngredientsSection (props: { section: string, ingredients: Item[] }) {
    const { section, ingredients } = props;
    const [showList, setShowList] = useState(true);
    const dispatch = useDispatch();
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    const imagePath = useMemo(() => {
        if (section === 'Alcohol') {
            return 'https://img.makedr.ink/i/drunk.webp';
        } else return '/images/ui/shaker.webp';
    }, [section]);

    const types = useMemo(() => {
        if (section === 'Alcohol') {
            return ['liquor', 'liqueur', 'other', 'wine'];
        } else return ['carbonated', 'juice', 'mixer'];
    }, [section]);

    function filterDataByType (type: string) {
        let filteredData: Item[] = [];

        const categoryData = ingredients.filter(ingredient => {
            return ingredient.Type === type;
        });

        for (const item of categoryData) {
            filteredData.push(item);
        }

        return filteredData;
    }

    const addAllIngredients = useCallback((e: React.MouseEvent<HTMLButtonElement>, ingredients: Item[]) => {
        for (const ingredient of ingredients) {
            dispatch(addIngredient(ingredient));
        }
    }, [dispatch]);

    const removeAllIngredients = useCallback((e: React.MouseEvent<HTMLButtonElement>, ingredients: Item[]) => {
        for (const ingredient of ingredients) {
            dispatch(removeIngredient(ingredient));
        }
    }, [dispatch]);

    return (
        <section className={styles.IngredientsSection}>
            <header>
                <h2>{section}</h2>
                <span
                    className={styles.icon}
                    style={{backgroundImage: `url(${imagePath})`, width: 96, height: 48}}
                ></span>
                <SelectAllButton 
                    clickEvent={allIngredientsStored(ingredients, storedIngredients) ? removeAllIngredients : addAllIngredients} 
                    ingredients={ingredients} />
                <button title={`Hide ${section}`} onClick={() => setShowList(prev => !prev)}>
                    <span
                        className={styles.icon}
                        style={{backgroundImage: `url(/images/ui/expand_${showList ? 'more' : 'less'}.svg)`, width: 64, height: 64}}
                    ></span>
                </button>
            </header>
            { showList && types.map((type: string, index: number) => {
                return (
                    <div key={index} className={styles.category}>
                        <div className={styles.categoryHeader}>
                            <IngredientCategory 
                                category={type} 
                                color="pink" 
                                clickEvent={allIngredientsStored(filterDataByType(type), storedIngredients) ? removeAllIngredients : addAllIngredients} 
                                ingredients={filterDataByType(type)} />
                        </div>
                        <IngredientList 
                            section={filterDataByType(type)} />
                    </div>
                );
            }) }
        </section>
    );
}