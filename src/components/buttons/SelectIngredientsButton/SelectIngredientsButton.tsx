import styles from './SelectIngredientsButton.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import updateWidth from '@/helpers/updateWidth';

export default function SelectIngredientsButton () {
    return (
        <nav className={styles.SelectIngredientsButton}>
            <Link href='/ingredients'>
                <button>
                    <div>
                        <Image 
                            alt='Select Ingredients' 
                            src={require('/public/images/ui/carbonated.webp')} 
                            width="0" 
                            height="32" 
                            onLoadingComplete={e => updateWidth(e)} />
                        <Image 
                            alt='Select Ingredients' 
                            src={require('/public/images/ui/liqueurs.webp')} 
                            width="0" 
                            height="32" 
                            onLoadingComplete={e => updateWidth(e)} />
                        <Image 
                            alt='Select Ingredients' 
                            src={require('/public/images/ui/mixers.webp')} 
                            width="0" 
                            height="32" 
                            onLoadingComplete={e => updateWidth(e)} />
                        <Image 
                            alt='Select Ingredients' 
                            src={require('/public/images/ui/other.webp')} 
                            width="0" 
                            height="32" 
                            onLoadingComplete={e => updateWidth(e)} />
                        <Image 
                            alt='Select Ingredients' 
                            src={require('/public/images/ui/spirits.webp')} 
                            width="0" 
                            height="32" 
                            onLoadingComplete={e => updateWidth(e)} />
                    </div>
                    <span>Select Your Ingredients</span>
                </button>
            </Link>
        </nav>
    );
}