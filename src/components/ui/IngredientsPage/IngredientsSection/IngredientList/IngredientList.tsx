// Component styles
import styles from './IngredientList.module.scss';
// Local components
import Ingredient from '@/components/ui/IngredientsPage/Ingredient/Ingredient';
import SelectAllButton from '@/components/buttons/SelectAllButton/SelectAllButton';
// Type interfaces
import { Item } from '@/types/index';
// React components
import { useMemo, useCallback } from 'react';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { addIngredient, removeIngredient } from '@/store/slices/ingredients.slice';
import { RootState } from '@/store/store';

export default function IngredientList (props: { section: Item[] }) {
    const { section } = props;
    const colors = useMemo(() => ['pink', 'green', 'red', 'yellow', 'orange', 'blue'], []);
    const dispatch = useDispatch();
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    // Remove ingredients that are variants of another ingredient
    const filteredSection = useMemo(() => {
        return section.filter(item => !item.AliasId)
    }, [section]);


    // Sort ingredients alphabetically before rendering to DOM
    const sortedSection = useMemo(() => {
        const sorted = filteredSection.sort((a: Item, b: Item) => {
            if (a.Name < b.Name) {
                return -1;
            } else {
                return 1;
            }
        })
        
        return sorted;
    }, [filteredSection]);

    const addAllIngredients = useCallback(() => {
        for (const ingredient of section) {
            dispatch(addIngredient(ingredient));
        }
    }, [dispatch, section]);

    const removeAllIngredients = useCallback(() => {
        for (const ingredient of section) {
            dispatch(removeIngredient(ingredient));
        }
    }, [dispatch, section]);

    const allIngredientsStored = useMemo(() => {
        return section.every((item: Item) => {
            if (item.Type && storedIngredients.hasOwnProperty(item.Type)) {
                for (const key of Object.keys(storedIngredients[item.Type])) {
                    const storedItem = storedIngredients[item.Type][key].find((storedItem: Item) => item.Id === storedItem.Id);

                    if (storedItem) {
                        return true;
                    }
                }
            }
        });
    }, [section, storedIngredients]);

    return (
        <div className={styles.IngredientList}>
            <SelectAllButton 
                clickEvent={allIngredientsStored ? removeAllIngredients : addAllIngredients} 
                ingredients={section} />
            <ul>
                {sortedSection.map((item: Item) => {
                    return (
                        <Ingredient
                            key={item.Id}
                            item={item}
                            section={section}
                        />
                    );
                })}
            </ul>
        </div>
    );
}