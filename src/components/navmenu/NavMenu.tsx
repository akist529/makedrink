// Component styles
import styles from './NavMenu.module.scss'
// Next components
import Link from 'next/link'
// Redux components
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { toggleNavMenu } from '@/store/slices/navMenu.slice'
// Local components
import NavMenuCategory from '@/components/navmenu/category/NavMenuCategory'
import NavMenuItem from '@/components/navmenu/item/NavMenuItem'

export default function NavMenu () {
    const spirits = ['Whiskey', 'Brandy', 'Gin', 'Rum', 'Scotch', 'Tequila', 'Vermouth', 'Vodka', 'Absinthe']
    const { navMenuOpen } = useSelector((state: RootState) => state.navMenu)
    const dispatch = useDispatch()

    return (
        <nav className={[styles.navmenu, (navMenuOpen ?  styles.open : styles.closed)].join(' ')}>
            <ul>
                <Link href='/ingredients' onClick={() => dispatch(toggleNavMenu())}>
                    <NavMenuItem item='Select Ingredients' />
                </Link>
                <NavMenuCategory category='Spirits' items={spirits} />
            </ul>
        </nav>
    )
}