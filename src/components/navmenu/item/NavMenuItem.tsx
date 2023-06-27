// Component styles
import styles from './NavMenuItem.module.scss';
// Next components
import Image from 'next/image';
import { useRouter } from 'next/router';
// React components
import { useMemo } from 'react';

export default function NavMenuItem(props: { item: string, slug: string, img: string }) {
    const { item, slug, img } = props;
    const router = useRouter();

    const className = useMemo(() => {
        const url = router.pathname.split('?')[0];

        if (url === slug) {
            return [styles.NavMenuItem, styles.active].join(' ');
        } else {
            return styles.NavMenuItem;
        }
    }, [router, slug]);

    return (
        <button className={className}>
            <span>{item}</span>
            <Image 
                alt={item} 
                src={require(`/public/images/ui/${img}`)} 
                width={36} 
                height={36} 
                style={{ width: 36, height: 36 }} />
        </button>
    );
}