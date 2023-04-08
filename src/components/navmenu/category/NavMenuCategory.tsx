// Component styles
import styles from './NavMenuCategory.module.scss'
// Next components
import Image from 'next/image'
import Link from 'next/link'
// Local components
import NavMenuItem from '@/components/navmenu/item/NavMenuItem'

export default function NavMenuCategory(props: {category: string, items: string[]}) {
    // Import props
    const {category, items} = props

    const imagePath = require(`/public/images/ui/expand_more.svg`)

    return (
        <li className={styles.category}>
            <button>
                <span>{category}</span>
                <Image alt='Expand' src={imagePath} width="40" height="40" />
            </button>
            <ul>
                {items.map((item: string, index) => {
                    return (
                        <Link key={index} href={`/${item.toLowerCase()}`}>
                            <NavMenuItem item={item} />
                        </Link>
                    )
                })}
            </ul>
        </li>
    )
}