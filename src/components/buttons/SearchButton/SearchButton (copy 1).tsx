import styles from './SearchButton.module.scss'
import Image from 'next/image'
import { useDispatch } from 'react-redux'

export default function SearchButton () {
    const dispatch = useDispatch()

    return (
        <button className={styles.search} onClick={() => dispatch({type: 'toggleSearch'})}>
            <Image alt='Search' src={require(`/public/images/ui/search.svg`)} width="40" height="40" />
        </button>
    )
}