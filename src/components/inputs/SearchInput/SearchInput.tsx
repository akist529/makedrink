import styles from './SearchInput.module.scss'
import CloseButton from '@/components/buttons/CloseButton/CloseButton'
import SearchButton from '@/components/buttons/SearchButton/SearchButton'
import SearchImg from 'public/images/ui/search.svg'
import Image from 'next/image'

export default function SearchInput(props: any) {
    const { setSearchOpen } = props

    return (
        <div className={styles.search}>
            <button>
                <Image alt='Search' src={SearchImg} />
            </button>
            <input type='text' placeholder='Search' />
            <CloseButton setSearchOpen={setSearchOpen} />
        </div>
    )
}