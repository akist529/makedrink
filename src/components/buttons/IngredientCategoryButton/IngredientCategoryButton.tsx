// Component styles
import styles from './IngredientCategoryButton.module.scss';
// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';
// React components
import { useMemo } from 'react';
// Local components
import SelectAllButton from '../SelectAllButton/SelectAllButton';
// Type interfaces
import { Item } from '@/types/index';

export default function IngredientCategoryButton(props: {category: string, color: string, clickEvent: Function, ingredients: Item[]}) {
    const { category, color, clickEvent, ingredients } = props;
    const ButtonStyles = useMemo(() => [styles.IngredientCategoryButton, styles[color]].join(' '), [color]);

    return (
        <div className={ButtonStyles}>
            <span>{category}</span>
            <Image 
                alt={category} 
                src={`https://img.makedr.ink/i/${getSlug(category)}.webp`} 
                width="0" 
                height="64" 
                onLoadingComplete={e => updateWidth(e)} 
                unoptimized />
            <SelectAllButton 
                clickEvent={clickEvent} 
                ingredients={ingredients} />
        </div>
    );
}