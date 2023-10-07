// Component styles
import styles from './NavMenuItem.module.scss';
// Next components
import { useRouter } from 'next/router';
import Link from 'next/link';
// React components
import { useMemo, useCallback } from 'react';
// Redux components
import { useDispatch } from 'react-redux';
import { toggleNavMenu } from '@/store/slices/navMenu.slice';

export default function NavMenuItem(props: { item: string, img: string, link: string }) {
    const { item, img, link } = props;
    const router = useRouter();
    const dispatch = useDispatch();

    const className = useMemo(() => {
        const url = router.pathname.split('?')[0];
        const slug = link.split('?')[0];
        
        if (url === slug) {
            return [styles.NavMenuItem, styles.active].join(' ');
        } else {
            return styles.NavMenuItem;
        }
    }, [router, link]);

    const handleClick = useCallback(() => {
        if (window.innerWidth < 600) {
            dispatch(toggleNavMenu());
        }
    }, [dispatch]);

    return (
        <li>
            <Link className={className} href={link} onClick={handleClick}>
                <span>{item}</span>
                <span
                    className={styles.icon}
                    style={{backgroundImage: `url(/images/ui/${img})`}}
                ></span>
            </Link>
        </li>
    );
}