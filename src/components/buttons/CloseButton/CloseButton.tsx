import Image from 'next/image'
import CloseImg from 'public/images/ui/close.webp'
import styles from './CloseButton.module.scss'

export default function CloseButton(props: any) {
    const { setSearchOpen } = props

    return (
        <button className={styles.closebtn} onClick={() => setSearchOpen((prevState: boolean) => !prevState)}>
            <Image alt='Close' src={CloseImg} />
        </button>
    )
}