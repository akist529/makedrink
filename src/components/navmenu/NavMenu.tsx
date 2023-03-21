import Image from 'next/image'
import styles from './NavMenu.module.scss'

export default function NavMenu (props: any) {
    const spirits = ['Bourbon', 'Brandy', 'Gin', 'Rum', 'Scotch', 'Tequila', 'Vermouth', 'Vodka', 'Whiskey']
    const { navMenuOpen } = props

    return (
        <nav className={[styles.navmenu, (navMenuOpen ?  styles.open : styles.closed)].join(' ')}>
            <ul>
                <li>
                    <span>Spirits</span>
                    <ul>
                        { spirits.map(spirit => {
                            return (
                                <li key={spirit}>
                                    <button>
                                        <span>{spirit}</span>
                                        <Image alt={spirit} src={require(`/public/images/ui/${spirit.toLowerCase()}.webp`)} width='48' height='48' />
                                    </button>
                                </li>
                            )
                        }) }
                    </ul>
                </li>
            </ul>
        </nav>
    )
}