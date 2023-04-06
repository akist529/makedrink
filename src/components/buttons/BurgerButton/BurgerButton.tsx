import BurgerImg from 'public/images/ui/menu.svg'
import BurgerImgOpen from 'public/images/ui/menu_open.svg'
import Image from 'next/image'
import styles from './BurgerButton.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { toggleNavMenu } from '@/store/slices/navMenu.slice'

export default function BurgerButton() {
    const { navMenuOpen } = useSelector((state: RootState) => state.navMenu)
    const dispatch = useDispatch()

    return (
        <button className={styles.burger} onClick={() => dispatch(toggleNavMenu())}>
            <Image alt='Open Menu' src={navMenuOpen ? BurgerImgOpen : BurgerImg} width="40" height="40" />
        </button>
    )
}