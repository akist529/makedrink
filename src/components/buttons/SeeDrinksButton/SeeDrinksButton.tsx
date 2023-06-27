// Component styles
import styles from './SeeDrinksButton.module.scss';
// Next components
import Link from 'next/link';
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function SeeDrinksButton () {
    return (
        <Link href='/drinks/filtered'>
            <button className={styles.SeeDrinksButton}>
                <span>See Drinks</span>
                <Image 
                    alt='See Drinks' 
                    src='https://img.makedr.ink/i/cocktail.webp' 
                    width="0" 
                    height="64" 
                    onLoadingComplete={e => updateWidth(e)} 
                    unoptimized />
            </button>
        </Link>
    );
}