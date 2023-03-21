import Image from 'next/image'
import styles from './NavMenu.module.scss'

export default function NavMenu () {
    const spirits = ['Bourbon', 'Brandy', 'Gin', 'Rum', 'Scotch', 'Tequila', 'Vermouth', 'Vodka', 'Whiskey']

    return (
        <nav>
            <ul>
                <li>
                    <span>Spirits</span>
                    <ul>
                        { spirits.map(spirit => {
                            return (
                                <li key={spirit}>
                                    <span>{spirit}</span>
                                    <Image alt={spirit} src={`/public/images/ui/${spirit.toLowerCase()}.webp`} width='64' height='64' />
                                </li>
                            )
                        }) }
                    </ul>
                </li>
            </ul>
        </nav>
    )
}