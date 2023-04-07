// Component styles
import styles from './BurgerButton.module.scss'
// Next components
import Image from 'next/image'
// Redux components
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { toggleNavMenu } from '@/store/slices/navMenu.slice'
// Local images
import BurgerImg from 'public/images/ui/menu.svg'
import BurgerImgOpen from 'public/images/ui/menu_open.svg'

export default function BurgerButton() {
    const { navMenuOpen } = useSelector((state: RootState) => state.navMenu)
    const dispatch = useDispatch()

    return (
        <button className={styles.burger} onClick={() => dispatch(toggleNavMenu())}>
            <Image alt='Open Menu' src={navMenuOpen ? BurgerImgOpen : BurgerImg} width="40" height="40" />
        </button>
    )
}