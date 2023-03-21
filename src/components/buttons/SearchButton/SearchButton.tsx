import styles from './SearchButton.module.scss'
import SearchImg from 'public/images/ui/search.webp'
import Image from 'next/image'

export default function SearchButton () {
    return (
        <button className={styles.search}>
            <Image alt='Search' src={SearchImg} />
        </button>
    )
}