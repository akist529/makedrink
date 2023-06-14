// Component styles
import styles from './IngredientsSection.module.scss';
// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
// Local components
import IngredientCategoryButton from '@/components/buttons/IngredientCategoryButton/IngredientCategoryButton';
import IngredientList from './IngredientList/IngredientList';
// Type interfaces
import { Item } from '@/types/index';

export default function IngredientsSection (props: { section: string, ingredients: Item[] }) {
    const { section, ingredients } = props;

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

    return (
        <section className={styles.IngredientsSection}>
            <header className={styles.category}>
                <h2>{section}</h2>
                <Image 
                    alt={section} 
                    src={imagePath} 
                    width="0"
                    height="48" 
                    onLoadingComplete={e => updateWidth(e)} />
            </header>
            { types.map((type: string, index: number) => {
                return (
                    <div key={index}>
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