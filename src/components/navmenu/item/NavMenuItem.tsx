import Image from 'next/image'
import styles from './NavMenuItem.module.scss'

export default function NavMenuItem(props: any) {
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