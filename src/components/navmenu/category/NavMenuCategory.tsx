import Image from 'next/image'
import ExpandImg from 'public/images/ui/expand_more.webp'
import styles from './NavMenuCategory.module.scss'
import NavMenuItem from '@/components/navmenu/item/NavMenuItem'

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
                    <NavMenuItem key={item} item={item} />
                )
            }) }
        </ul>
    </li>
    )
}