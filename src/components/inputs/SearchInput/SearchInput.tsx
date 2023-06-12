// Component styles
import styles from './SearchInput.module.scss';
// Next components
import Image from 'next/image';
// Local components
import CloseButton from '@/components/buttons/CloseButton/CloseButton';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function SearchInput() {
    const imagePath = require('/public/images/ui/search.svg');

    return (
        <div className={styles.SearchInput}>
            <button>
                <Image 
                    alt='Search' 
                    src={imagePath} 
                    width="0" 
                    height="40" 
                    onLoadingComplete={e => updateWidth(e)} />
            </button>
            <input 
                type='text' 
                placeholder='Search' />
            <CloseButton />
        </div>
    );
}