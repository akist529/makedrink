// Component styles
import styles from './PaginationLinks.module.scss';
// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';
// React components
import { useCallback } from 'react';

export default function PaginationLinks (props: { activePage: number, setActivePage: Function, numOfPages: number, loadState: boolean }) {
    const { activePage, setActivePage, numOfPages, loadState } = props;

    const changePage = useCallback((index: number) => {
        if (!loadState) setActivePage(index);
    }, [loadState, setActivePage]);

    const setPageLeft = useCallback(() => {
        if (!loadState) setActivePage((prevState: number) => (prevState + numOfPages - 1) % numOfPages);
    }, [loadState, numOfPages, setActivePage]);

    const setPageRight = useCallback(() => {
        if (!loadState) setActivePage((prevState: number) => (prevState + numOfPages + 1) % numOfPages);
    }, [loadState, numOfPages, setActivePage]);

    return (
        <nav className={styles.PaginationLinks}>
            <button className={styles.PaginateBtn} onClick={setPageLeft}>
                <Image 
                    alt='Left' 
                    src={require('/public/images/ui/chevron_left.svg')} 
                    width="0" 
                    height="32" 
                    onLoadingComplete={e => updateWidth(e)} />
            </button>
            <ul>
            { Array.from(Array(numOfPages).keys()).map((num: number, index: number) => {
                return (
                    <li key={index}>
                        <button className={(activePage === num) ? styles.activeBtn : ''} onClick={() => changePage(num)}>
                            <span>{num + 1}</span>
                        </button>
                    </li>
                );
            }) }
            </ul>
            <button className={styles.PaginateBtn} onClick={setPageRight}>
                <Image 
                    alt='Right' 
                    src={require('/public/images/ui/chevron_right.svg')} 
                    width="0" 
                    height="32" 
                    onLoadingComplete={e => updateWidth(e)} />
            </button>
        </nav>
    );
}