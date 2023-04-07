// Component styles
import styles from './NavMenuItem.module.scss'
// Next components
import Image from 'next/image'

export default function NavMenuItem(props: {item: string}) {
    // Import props
    const {item} = props

    const imagePath = require(`/public/images/ui/${item.toLowerCase().split(' ').join('-')}.webp`)

    return (
        <li className={styles.item}>
            <button>
                <span>{item}</span>
                <Image alt={item} src={imagePath} width='48' height='48' />
            </button>
        </li>
    )
}