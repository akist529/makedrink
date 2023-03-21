import styles from './SearchButton.module.scss'
import SearchImg from 'public/images/ui/search.webp'
import Image from 'next/image'

export default function SearchButton (props: any) {
    const { setSearchOpen } = props

    return (
        <button className={styles.search} onClick={() => setSearchOpen((prevState: boolean) => !prevState)}>
            <Image alt='Search' src={SearchImg} />
        </button>
    )
}