// Component styles
import styles from './BurgerButton.module.scss';
// Next components
import Image from 'next/image';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleNavMenu } from '@/store/slices/navMenu.slice';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
// React components
import { useMemo } from 'react';

export default function BurgerButton() {
    const { navMenuOpen } = useSelector((state: RootState) => state.navMenu);
    const dispatch = useDispatch();
    
    const text = useMemo(() => {
        if (navMenuOpen) {
            return 'Close Nav Menu';
        } else {
            return 'Open Nav Menu';
        }
    }, [navMenuOpen]);

    return (
        <button className={styles.BurgerButton} onClick={() => dispatch(toggleNavMenu())}>
            <Image 
                alt={text} 
                src={require(`public/images/ui/menu${navMenuOpen? '_open' : ''}.svg`)} 
                width="0" 
                height="40" 
                title={text} 
                onLoadingComplete={e => updateWidth(e)} />
        </button>
    );
}