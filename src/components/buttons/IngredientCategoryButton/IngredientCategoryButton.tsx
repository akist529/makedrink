// Component styles
import styles from './IngredientCategoryButton.module.scss';
// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';

export default function IngredientCategoryButton(props: {category: string, color: string}) {
    const { category, color } = props;

    const ButtonStyles = [styles.IngredientCategoryButton, styles[color]].join(' ');
    const imagePath = require(`/public/images/ui/${getSlug(category)}.webp`);
    
    return (
        <button className={ButtonStyles}>
            <span>{category}</span>
            <Image 
                alt={category} 
                src={imagePath} 
                width="0" 
                height="64" 
                onLoadingComplete={e => updateWidth(e)} />
        </button>
    );
}