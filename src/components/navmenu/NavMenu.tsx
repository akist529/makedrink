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
    // Redux selectors
    const { navMenuOpen } = useSelector((state: RootState) => state.navMenu);
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);

    const spirits = ['Whiskey', 'Brandy', 'Gin', 'Rum', 'Scotch', 'Tequila', 'Vermouth', 'Vodka', 'Absinthe']
    const dispatch = useDispatch()
    const navStyles = [styles.navmenu, (navMenuOpen ?  styles.open : styles.closed)].join(' ')

    return (
        <nav className={navStyles}>
            <ul>
                <Link href='/' onClick={() => dispatch(toggleNavMenu())}>
                    <NavMenuItem item='Make A Drink' />
                </Link>
                <Link href='/ingredients' onClick={() => dispatch(toggleNavMenu())}>
                    <NavMenuItem item='Select Ingredients' />
                </Link>
                { Object.keys(storedIngredients).map((type, index) => {
                    return <NavMenuCategory key={index} type={type} />
                }) }
            </ul>
        </nav>
    )
}