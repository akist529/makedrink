// Component styles
import styles from './IngredientsTitle.module.scss';
// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function IngredientsTitle () {
    const ingredientsImagePath = require('/public/images/ui/local_bar.svg');

    return (
        <header className={styles.IngredientsTitle}>
            <div>
                {'Select'.split('').map((letter: string, index: number) => {
                    return (
                        <span key={index}>{letter}</span>
                    );
                })}
            </div>
            <div>
                {'Ingredients'.split('').map((letter: string, index: number) => {
                    return (
                        <span key={index}>{letter}</span>
                    );
                })}
            </div>
            <Image 
                alt='Select Ingredients' 
                src={ingredientsImagePath} 
                width='0' 
                height='64' 
                onLoadingComplete={e => updateWidth(e)} />
        </header>
    );
}