// Component styles
import styles from './SearchInput.module.scss';
// Next components
import Image from 'next/image';
// Local components
import CloseButton from '@/components/buttons/CloseButton/CloseButton';
import SearchButton from '@/components/buttons/SearchButton/SearchButton';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
// Redux components
import { updateSearch, clearSearch } from '@/store/slices/search.slice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleSearch } from '@/store/slices/search.slice';
// React components
import { useCallback, useEffect } from 'react';

export default function SearchInput() {
    const dispatch = useDispatch();
    const searchOpen = useSelector((state: RootState) => state.search.searchOpen);

    const updateQuery = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.currentTarget.value;
        dispatch(updateSearch(query));
    }, [dispatch]);

    const focusInput = useCallback(() => {
        document.getElementById('search')?.focus();
    }, []);

    useEffect(() => {
        if (!searchOpen) {
            dispatch(clearSearch());
        } else {
            document.getElementById('search')?.focus();
        }
    }, [searchOpen, dispatch]);

    return (
        <div className={styles.SearchInput}>
            <SearchButton 
                onClick={focusInput} 
                style={{ filter: 'invert(0)' }} />
            <input 
                id='search' 
                type='text' 
                placeholder='Search'
                onChange={e => updateQuery(e)} />
            <CloseButton 
                onClick={() => dispatch(toggleSearch())} 
                text='Close Search Bar' />
        </div>
    );
}