// Component styles
import styles from './SearchInput.module.scss';
// Next components
import Image from 'next/image';
// Local components
import CloseButton from '@/components/buttons/CloseButton/CloseButton';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
// Redux components
import { updateSearch, clearSearch } from '@/store/slices/search.slice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
// React components
import { useCallback, useEffect } from 'react';

export default function SearchInput() {
    const dispatch = useDispatch();
    const searchOpen = useSelector((state: RootState) => state.search.searchOpen);

    const updateQuery = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.currentTarget.value;
        dispatch(updateSearch(query));
    }, [dispatch]);

    useEffect(() => {
        if (!searchOpen) {
            dispatch(clearSearch());
        }
    }, [searchOpen, dispatch]);

    return (
        <div className={styles.SearchInput}>
            <button>
                <Image 
                    alt='Search' 
                    src={require('/public/images/ui/search.svg')} 
                    width="0" 
                    height="40" 
                    onLoadingComplete={e => updateWidth(e)} />
            </button>
            <input 
                type='text' 
                placeholder='Search'
                onChange={e => updateQuery(e)} />
            <CloseButton />
        </div>
    );
}