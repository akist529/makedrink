// Component styles
import styles from './BurgerButton.module.scss';
// React components
import { useState, useEffect } from 'react';
// Next components
import Image from 'next/image';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleNavMenu } from '@/store/slices/navMenu.slice';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function BurgerButton() {
    const { navMenuOpen } = useSelector((state: RootState) => state.navMenu);
    const [imagePath, setImagePath] = useState('public/images/ui/menu_open.svg');
    const dispatch = useDispatch();

    useEffect(() => {
        if (navMenuOpen) {
            setImagePath(require('public/images/ui/menu_open.svg'));
        } else {
            setImagePath(require('public/images/ui/menu.svg'));
        }
    }, [navMenuOpen]);

    return (
        <button className={styles.BurgerButton} onClick={() => dispatch(toggleNavMenu())}>
            <Image 
                alt='Open Nav Menu' 
                src={imagePath} 
                width="0" 
                height="40" 
                onLoadingComplete={e => updateWidth(e)} />
        </button>
    );
}