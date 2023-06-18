// Component styles
import styles from './NavMenuItem.module.scss';
// Next components
import Image from 'next/image';
import { useRouter } from 'next/router';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
// React components
import { useMemo } from 'react';

export default function NavMenuItem(props: { item: string, slug: string, img: string }) {
    const { item, slug, img } = props;
    const router = useRouter();
    const url = useMemo(() => router.pathname.split('?')[0], [router.pathname]);

    return (
        <button className={(url === slug) ? [styles.NavMenuItem, styles.active].join(' ') : styles.NavMenuItem}>
            <span>{item}</span>
            <Image 
                alt={item} 
                src={require(`/public/images/ui/${img}`)} 
                width='0' 
                height='48' 
                onLoadingComplete={e => updateWidth(e)} />
        </button>
    );
}