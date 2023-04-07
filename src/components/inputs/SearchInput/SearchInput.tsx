// Component styles
import styles from './SearchInput.module.scss'
// Next components
import Image from 'next/image'
// Local components
import CloseButton from '@/components/buttons/CloseButton/CloseButton'

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