// Component styles
import styles from './NavMenuItem.module.scss'
// Next components
import Image from 'next/image'

export default function NavMenuItem(props: {item: string}) {
    const {item} = props

    const file = (() => {
        return item.toLowerCase().split(' ').join('-')
    })()

    return (
        <li className={styles.item}>
            <button>
                <span>{item}</span>
                <Image alt={item} src={require(`/public/images/ui/${file}.webp`)} width='48' height='48' />
            </button>
        </li>
    )
}