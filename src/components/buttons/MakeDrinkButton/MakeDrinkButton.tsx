import styles from './MakeDrinkButton.module.scss';
import Image from 'next/image';

export default function MakeDrinkButton () {
    return (
        <button className={styles.MakeDrinkButton}>
            <Image 
            alt="Make a Drink" 
            src={require('/public/images/ui/select-ingredients.webp')} 
            width="48" 
            height="48" />
            <span>Make A Drink!</span>
        </button>
    );
}