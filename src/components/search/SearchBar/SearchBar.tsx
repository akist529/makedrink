// Component styles
import styles from './SearchBar.module.scss';
// Local components
import SearchButton from '@/components/buttons/SearchButton/SearchButton';
import SearchInput from '@/components/search/SearchInput/SearchInput';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { openSearch, closeSearch } from '@/store/slices/search.slice';
// React components
import { useCallback } from 'react';

export default function SearchBar() {
    // Redux state
    const searchOpen = useSelector((state: RootState) => state.search.open);
    const dispatch = useDispatch();

    const clickEvent = useCallback(() => {
        if (searchOpen) return dispatch(closeSearch())
            else return dispatch(openSearch());
    }, [dispatch, searchOpen]);

    return (
        <div data-testid='searchbar' className={styles.SearchBar}>
            { searchOpen && 
                <SearchInput /> }
            <SearchButton 
                clickEvent={clickEvent} 
                style={{ filter: 'invert(1)' }} />
        </div>
    );
}