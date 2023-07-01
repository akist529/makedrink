// Component styles
import styles from './SearchBar.module.scss';
// Local components
import SearchButton from '@/components/buttons/SearchButton/SearchButton';
import SearchInput from '@/components/search/SearchInput/SearchInput';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleSearch } from '@/store/slices/search.slice';

export default function SearchBar() {
    // Redux state
    const { searchOpen } = useSelector((state: RootState) => state.search);
    const dispatch = useDispatch();

    return (
        <div data-testid='searchbar' className={styles.SearchBar}>
            { searchOpen && 
                <SearchInput /> }
            <SearchButton 
                onClick={() => dispatch(toggleSearch())} 
                style={{ filter: 'invert(1)' }} />
        </div>
    );
}