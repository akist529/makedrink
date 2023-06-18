// Component styles
import styles from './IngredientCheckbox.module.scss';
// React components
import { useMemo } from 'react';
// Next components
import Image from 'next/image';
// Type interfaces
import { Item } from '@/types/index';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function IngredientCheckbox(props: { item: Item, isChecked: boolean }) {
    // Import props
    const { item, isChecked } = props;

    // Decide color of checkmark based on ingredient color
    const colorIsLight = useMemo(() => {
        const style = getComputedStyle(document.body);
        const hex = style.getPropertyValue(`--whiskey`).replace('#', '');
        const c_r = parseInt(hex.substring(0, 0 + 2), 16);
        const c_g = parseInt(hex.substring(2, 2 + 2), 16);
        const c_b = parseInt(hex.substring(4, 4 + 2), 16);
        const brightness = (((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000);
        return (brightness > 155);
    }, []);
    
    const boxStyles = useMemo(() => [styles.IngredientCheckbox, (isChecked && styles.checked), (colorIsLight && styles.lightColor)].join(' '), [colorIsLight, isChecked]);

    return (
        <div id={item.Name} className={boxStyles} {...isChecked && {style: {background: `var(--whiskey)`}}}>
            { !isChecked && 
                <Image 
                    className={styles.notSelected} 
                    alt="Ingredient Not Selected" 
                    src={require('/public/images/ui/close.svg')} 
                    width="0" 
                    height="48" 
                    onLoadingComplete={e => updateWidth(e)} /> }
        </div>
    );
}