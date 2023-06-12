// Component styles
import styles from './IngredientCatBtn.module.scss';
// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function IngredientCatBtn(props: {category: string, color: string}) {
    const { category, color } = props;

    const ButtonStyles = [styles.IngredientCatBtn, styles[color]].join(' ');
    const slug = category.toLowerCase();
    const imagePath = require(`/public/images/ui/${slug}.webp`);
    
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