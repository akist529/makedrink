// Component styles
import styles from './BurgerButton.module.scss';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleNavMenu } from '@/store/slices/navMenu.slice';
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
        <button title={text} className={styles.BurgerButton} onClick={() => dispatch(toggleNavMenu())}>
            <span
                className={styles.icon}
                style={{backgroundImage: `url(/images/ui/menu${navMenuOpen ? '_open' : ''}.svg)`}}
            ></span>
        </button>
    );
}