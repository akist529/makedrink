// Component styles
import styles from './SelectIngredientsButton.module.scss';
// Next components
import Image from 'next/image';
import Link from 'next/link';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function SelectIngredientsButton () {
    return (
        <nav className={styles.SelectIngredientsButton}>
            <Link href='/ingredients'>
                <button>
                    <div>
                        <Image 
                            alt='Select Ingredients' 
                            src='https://img.makedr.ink/i/carbonated.webp' 
                            width="0" 
                            height="32" 
                            onLoadingComplete={e => updateWidth(e)} 
                            unoptimized />
                        <Image 
                            alt='Select Ingredients' 
                            src='https://img.makedr.ink/i/liqueurs.webp' 
                            width="0" 
                            height="32" 
                            onLoadingComplete={e => updateWidth(e)} 
                            unoptimized />
                        <Image 
                            alt='Select Ingredients' 
                            src='https://img.makedr.ink/i/mixers.webp' 
                            width="0" 
                            height="32" 
                            onLoadingComplete={e => updateWidth(e)} 
                            unoptimized />
                        <Image 
                            alt='Select Ingredients' 
                            src='https://img.makedr.ink/i/other.webp' 
                            width="0" 
                            height="32" 
                            onLoadingComplete={e => updateWidth(e)} 
                            unoptimized />
                        <Image 
                            alt='Select Ingredients' 
                            src='https://img.makedr.ink/i/spirits.webp' 
                            width="0" 
                            height="32" 
                            onLoadingComplete={e => updateWidth(e)} 
                            unoptimized />
                    </div>
                    <span>Select Your Ingredients</span>
                </button>
            </Link>
        </nav>
    );
}