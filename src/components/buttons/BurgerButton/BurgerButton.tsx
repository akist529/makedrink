// Component styles
import styles from './BurgerButton.module.scss'
// Next components
import Image from 'next/image'
// Redux components
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { toggleNavMenu } from '@/store/slices/navMenu.slice'

export default function BurgerButton() {
    // Redux selectors
    const { navMenuOpen } = useSelector((state: RootState) => state.navMenu)
    
    const dispatch = useDispatch()
    const imagePathOpen = require('public/images/ui/menu_open.svg')
    const imagePathClosed = require('public/images/ui/menu.svg')

    return (
        <button className={styles.burger} onClick={() => dispatch(toggleNavMenu())}>
            <Image alt='Open Menu' src={navMenuOpen ? imagePathOpen : imagePathClosed} width="40" height="40" />
        </button>
    )
}