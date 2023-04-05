import styles from './SearchInput.module.scss'
import CloseButton from '@/components/buttons/CloseButton/CloseButton'
import Image from 'next/image'

export default function SearchInput() {
    return (
        <div className={styles.search}>
            <button>
                <Image alt='Search' src={require(`/public/images/ui/search.svg`)} width="40" height="40" />
            </button>
            <input type='text' placeholder='Search' />
            <CloseButton />
        </div>
    )
}