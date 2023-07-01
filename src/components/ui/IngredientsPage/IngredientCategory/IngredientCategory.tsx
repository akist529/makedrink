// Component styles
import styles from './IngredientCategory.module.scss';
// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
import getSlug from '@/helpers/getSlug';
// React components
import { useMemo } from 'react';
// Local components
import SelectAllButton from '../../../buttons/SelectAllButton/SelectAllButton';
// Type interfaces
import { Item } from '@/types/index';

export default function IngredientCategory (props: {category: string, color: string, clickEvent: Function, ingredients: Item[]}) {
    const { category, color, clickEvent, ingredients } = props;

    const className = useMemo(() => {
        return [styles.IngredientCategory, styles[color]].join(' ');
    }, [color]);

    return (
        <div data-testid="ingredient-category" className={className}>
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