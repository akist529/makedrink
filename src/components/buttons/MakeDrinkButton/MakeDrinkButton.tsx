import styles from './MakeDrinkButton.module.scss';
import Image from 'next/image';
import updateWidth from '@/helpers/updateWidth';

export default function MakeDrinkButton () {
    return (
        <button className={styles.MakeDrinkButton}>
            <Image 
                alt="Make a Drink" 
                src={require('/public/images/ui/select-ingredients.webp')} 
                width="0" 
                height="48" 
                onLoadingComplete={e => updateWidth(e)} />
            <span>Make A Drink!</span>
        </button>
    );
}