// Component styles
import styles from './NavMenuCategory.module.scss'
// Next components
import Image from 'next/image'
import Link from 'next/link'
// Local components
import NavMenuItem from '@/components/navmenu/item/NavMenuItem'

export default function NavMenuCategory(props: {category: string, items: string[]}) {
    const {category, items} = props

    return (
        <li className={styles.category}>
            <button>
                <span>{category}</span>
                <Image alt='Expand' src={require(`/public/images/ui/expand_more.svg`)} width="40" height="40" />
            </button>
            <ul>
                { items.map((item: string) => {
                    return (
                        <Link key={item} href={`/${item.toLowerCase()}`}>
                            <NavMenuItem item={item} />
                        </Link>
                    )
                }) }
            </ul>
        </li>
    )
}