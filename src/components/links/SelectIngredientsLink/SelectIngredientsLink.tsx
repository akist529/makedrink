// Component styles
import styles from './SelectIngredientsLink.module.scss';
// Next components
import Link from 'next/link';

export default function SelectIngredientsLink () {
    return (
        <Link href='/ingredients' className={styles.SelectIngredientsLink}>
            <div>
                <span
                    className={styles.icon}
                    style={{backgroundImage: `url(https://img.makedr.ink/i/carbonated.webp)`}}
                ></span>
                <span
                    className={styles.icon}
                    style={{backgroundImage: `url(https://img.makedr.ink/i/liqueurs.webp)`}}
                ></span>
                <span
                    className={styles.icon}
                    style={{backgroundImage: `url(https://img.makedr.ink/i/mixers.webp)`}}
                ></span>
                <span
                    className={styles.icon}
                    style={{backgroundImage: `url(https://img.makedr.ink/i/other.webp)`}}
                ></span>
                <span
                    className={styles.icon}
                    style={{backgroundImage: `url(https://img.makedr.ink/i/spirits.webp)`}}
                ></span>
            </div>
            <span
                className={styles.text}
            >Select Your Ingredients</span>
        </Link>
    );
}