import Image from 'next/image'
import ExpandImg from 'public/images/ui/expand_more.svg'
import styles from './NavMenuCategory.module.scss'
import NavMenuItem from '@/components/navmenu/item/NavMenuItem'
import Link from 'next/link'

export default function NavMenuCategory(props: any) {
    const {category, items} = props

    return (
        <li className={styles.category}>
            <button>
                <span>{category}</span>
                <Image alt='Expand' src={ExpandImg} />
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