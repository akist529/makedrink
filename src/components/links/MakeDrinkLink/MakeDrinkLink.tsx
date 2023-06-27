// Component styles
import styles from './MakeDrinkLink.module.scss';
// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function MakeDrinkLink () {
    return (
        <div className={styles.MakeDrinkLink} title="Make A Drink">
            <Image 
                alt="Make A Drink" 
                src={require('/public/images/ui/select-ingredients.webp')} 
                width="0" 
                height="48" 
                onLoadingComplete={e => updateWidth(e)} />
            <span>Make A Drink!</span>
        </div>
    );
}