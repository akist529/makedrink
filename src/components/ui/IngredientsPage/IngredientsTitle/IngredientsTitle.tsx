// Component styles
import styles from './IngredientsTitle.module.scss';

export default function IngredientsTitle () {
    return (
        <header className={styles.IngredientsTitle}>
            <div>
            { 'Select'.split('').map((letter: string, index: number) => {
                return (
                    <span key={index}>{letter}</span>
                );
            }) }
            </div>
            <div>
            { 'Ingredients'.split('').map((letter: string, index: number) => {
                return (
                    <span key={index}>{letter}</span>
                );
            }) }
            </div>
        </header>
    );
}