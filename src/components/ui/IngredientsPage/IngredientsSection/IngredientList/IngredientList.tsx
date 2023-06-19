// Component styles
import styles from './IngredientList.module.scss';
// Local components
import Ingredient from '@/components/ui/IngredientsPage/Ingredient/Ingredient';
// Type interfaces
import { Item } from '@/types/index';
// React components
import { useMemo } from 'react';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
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

    return (
        <div className={styles.IngredientList}>
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