import styles from './SelectIngredientsButton.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function SelectIngredientsButton () {
    function updateWidth (e: HTMLImageElement) {
        e.width = (e.height / e.naturalHeight) * e.naturalWidth;
    }

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