import styles from './SearchButton.module.scss'
import Image from 'next/image'

export default function SearchButton (props: {setSearchOpen: Function}) {
    const { setSearchOpen } = props

    return (
        <button className={styles.search} onClick={() => setSearchOpen((prevState: boolean) => !prevState)}>
            <Image alt='Search' src={require(`/public/images/ui/search.svg`)} width="40" height="40" />
        </button>
    )
}