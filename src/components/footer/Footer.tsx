// Component styles
import styles from './Footer.module.scss';
// Next components
import Link from 'next/link';
// React imports
import { useMemo } from 'react';

export default function Footer () {
    const currentYear = useMemo(() => {
        return new Date().getFullYear();
    }, []);

    return (
        <footer className={styles.Footer}>
            <span>MakeDrink © {currentYear} Alex Kist & Sabrina Tarson</span>
            <Link href='/credits'>
                <span>All materials used belong to their respective authors</span>
            </Link>
        </footer>
    );
}
