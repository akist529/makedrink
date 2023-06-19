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
import { useDispatch } from 'react-redux';
import { addIngredient } from '@/store/slices/ingredients.slice';

export default function IngredientList (props: { section: Item[] }) {
    const { section } = props;
    const colors = useMemo(() => ['pink', 'green', 'red', 'yellow', 'orange', 'blue'], []);
    const dispatch = useDispatch();

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

    const handleClick = useCallback(() => {
        for (const ingredient of section) {
            dispatch(addIngredient(ingredient));
        }
    }, [dispatch, section]);

    return (
        <div className={styles.IngredientList}>
            <SelectAllButton clickEvent={handleClick} />
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