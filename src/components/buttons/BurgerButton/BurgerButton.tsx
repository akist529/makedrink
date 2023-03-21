import BurgerImg from 'public/images/ui/menu.webp'
import BurgerImgOpen from 'public/images/ui/menu_open.webp'
import Image from 'next/image'
import styles from './BurgerButton.module.scss'

export default function BurgerButton(props: any) {
    const { navMenuOpen, setNavMenuOpen } = props

    return (
        <button className={styles.burger} onClick={() => setNavMenuOpen((prevState: boolean) => !prevState)}>
            <Image alt='Open Menu' src={navMenuOpen ? BurgerImgOpen : BurgerImg} />
        </button>
    )
}