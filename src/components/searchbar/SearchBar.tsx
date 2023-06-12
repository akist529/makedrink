import styles from './SearchBar.module.scss';
import SearchButton from "../buttons/SearchButton/SearchButton";
import SearchInput from "../inputs/SearchInput/SearchInput";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function SearchBar() {
    const { searchOpen } = useSelector((state: RootState) => state.search);

    return (
        <div className={styles.SearchBar}>
            { searchOpen && 
                <SearchInput /> }
            <SearchButton />
        </div>
    );
}