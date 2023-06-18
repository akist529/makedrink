// Component styles
import styles from './IngredientCategoryButton.module.scss';
// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';
// React components
import { useMemo } from 'react';

export default function IngredientCategoryButton(props: {category: string, color: string}) {
    const { category, color } = props;
    const ButtonStyles = useMemo(() => [styles.IngredientCategoryButton, styles[color]].join(' '), [color]);

    return (
        <button className={ButtonStyles}>
            <span>{category}</span>
            <Image 
                alt={category} 
                src={require(`/public/images/ui/${getSlug(category)}.webp`)} 
                width="0" 
                height="64" 
                onLoadingComplete={e => updateWidth(e)} />
        </button>
    );
}