import BurgerImg from 'public/images/ui/menu.svg'
import BurgerImgOpen from 'public/images/ui/menu_open.svg'
import Image from 'next/image'
import styles from './BurgerButton.module.scss'

export default function BurgerButton(props: any) {
    const { navMenuOpen, setNavMenuOpen } = props

    return (
        <button className={styles.burger} onClick={() => setNavMenuOpen((prevState: boolean) => !prevState)}>
            <Image alt='Open Menu' src={navMenuOpen ? BurgerImgOpen : BurgerImg} width="40" height="40" />
        </button>
    )
}