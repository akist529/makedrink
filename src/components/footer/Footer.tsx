// Component styles
import styles from './Footer.module.scss';
// Next components
import Link from 'next/link';

export default function Footer () {
    return (
        <footer className={styles.Footer}>
            <span>MakeDrink © 2023 Alex Kist & Chase Tarson</span>
            <Link href='/credits'>
                <span>All materials used belong to their respective authors</span>
            </Link>
        </footer>
    );
}