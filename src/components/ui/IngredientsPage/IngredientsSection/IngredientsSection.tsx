// Component styles
import styles from './IngredientsSection.module.scss';
// Next components
import Image from 'next/image';
// React components
import { useState, useCallback, useMemo } from 'react';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
// Local components
import IngredientCategoryButton from '@/components/buttons/IngredientCategoryButton/IngredientCategoryButton';
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

    const imagePath = (() => {
        if (section === 'Alcohol') {
            return require('/public/images/ui/drunk.webp');
        } else {
            return require('/public/images/ui/shaker.webp');
        }
    })();

    const types = (() => {
        if (section === 'Alcohol') {
            return ['liquor', 'liqueur', 'other', 'wine'];
        } else {
            return ['carbonated', 'juice', 'mixer'];
        }
    })();

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

    const addAllIngredients = useCallback(() => {
        for (const ingredient of ingredients) {
            dispatch(addIngredient(ingredient));
        }
    }, [dispatch, ingredients]);

    const removeAllIngredients = useCallback(() => {
        for (const ingredient of ingredients) {
            dispatch(removeIngredient(ingredient));
        }
    }, [dispatch, ingredients]);

    const allIngredientsStored = useMemo(() => {
        return ingredients.every((item: Item) => {
            if (item.Type && storedIngredients.hasOwnProperty(item.Type)) {
                for (const key of Object.keys(storedIngredients[item.Type])) {
                    const storedItem = storedIngredients[item.Type][key].find((storedItem: Item) => item.Id === storedItem.Id);

                    if (storedItem) {
                        return true;
                    }
                }
            }
        });
    }, [ingredients, storedIngredients]);

    return (
        <section className={styles.IngredientsSection}>
            <header>
                <button onClick={() => setShowList(prev => !prev)}>
                    <h2>{section}</h2>
                    <Image 
                        alt={section} 
                        src={imagePath} 
                        width="0"
                        height="48" 
                        onLoadingComplete={e => updateWidth(e)} />
                    <Image 
                        alt={`Hide ${section}`} 
                        src={require(`/public/images/ui/expand_${showList ? 'more' : 'less'}.svg`)} 
                        width="0" 
                        height="64" 
                        onLoadingComplete={e => updateWidth(e)} />
                </button>
            </header>
            <SelectAllButton 
                clickEvent={allIngredientsStored ? removeAllIngredients : addAllIngredients} 
                ingredients={ingredients} />
            { showList && types.map((type: string, index: number) => {
                return (
                    <div key={index} className={styles.category}>
                        <IngredientCategoryButton 
                            category={type} 
                            color="pink" />
                        <IngredientList 
                            section={filterDataByType(type)} />
                    </div>
                );
            }) }
        </section>
    );
}