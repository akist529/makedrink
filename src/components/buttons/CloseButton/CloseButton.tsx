import Image from 'next/image'
import styles from './CloseButton.module.scss'

export default function CloseButton(props: {setSearchOpen: Function}) {
    const { setSearchOpen } = props

    return (
        <button className={styles.closebtn} onClick={() => setSearchOpen((prevState: boolean) => !prevState)}>
            <Image alt='Close' src={require(`/public/images/ui/close.svg`)} width="48" height="48" />
        </button>
    )
}