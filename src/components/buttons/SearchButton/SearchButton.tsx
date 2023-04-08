// Component styles
import styles from './SearchButton.module.scss'
// Next components
import Image from 'next/image'
// Redux components
import { useDispatch } from 'react-redux'
import { toggleSearch } from '@/store/slices/search.slice'

export default function SearchButton () {
    const dispatch = useDispatch()
    const imagePath = require(`/public/images/ui/search.svg`)

    return (
        <button className={styles.search} onClick={() => dispatch(toggleSearch())}>
            <Image alt='Search' src={imagePath} width="40" height="40" />
        </button>
    )
}