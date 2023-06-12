import styles from './SeeDrinksButton.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function SeeDrinksButton () {
    return (
        <Link href='/drinks/filtered'>
            <button className={styles.SeeDrinksButton}>
            <span>See Drinks</span>
            <Image 
                alt='See Drinks' 
                src={require('/public/images/ui/cocktail.webp')} 
                width="64" 
                height="64" />
            </button>
        </Link>
    );
}